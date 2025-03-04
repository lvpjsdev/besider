import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleType } from '../../../entities/Article/model/types';
import { type RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectMenuState } from '../../Menu/store/menuSlice';

interface ArticlesListResponse {
  response: {
    docs: ArticleType[];
  };
}

interface ArticlesListParams {
  year: number;
  month: number;
}

type GetArticlesListResult = {
  dateStr: string;
  articles: Record<string, ArticleType[]>;
};

const nowDate = new Date();

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getInfiniteArticles: build.infiniteQuery<
      GetArticlesListResult,
      unknown,
      ArticlesListParams
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
        },
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
          const pageDate = new Date(
            `01/${lastPageParam.month}/${lastPageParam.year}`
          );
          pageDate.setMonth(pageDate.getMonth() - 1);

          return {
            year: pageDate.getFullYear(),
            month: pageDate.getMonth() + 1,
          };
        },
      },
      query: ({ pageParam: { year, month } }) =>
        `${year}/${month}.json?api-key=${import.meta.env.VITE_API_KEY}`,

      transformResponse: (response: ArticlesListResponse) => {
        const dateStrIndex = response.response.docs[0].pub_date.split('T')[0];
        const articlesBySection = response.response.docs.reduce(
          (acc, article) => {
            if (!acc[article.section_name]) {
              acc[article.section_name] = [];
            }
            acc[article.section_name].push(article);
            return acc;
          },
          {} as Record<string, ArticleType[]>
        );
        return {
          dateStr: dateStrIndex,
          articles: articlesBySection,
        } as GetArticlesListResult;
      },
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetInfiniteArticlesInfiniteQuery } = articlesApi;

export const selectArticlesBySection = createSelector(
  [
    (state: RootState) =>
      articlesApi.endpoints.getInfiniteArticles.select({})(state),
    selectMenuState,
  ],
  (articlesResult, { section }) => {
    const articlesListResult = articlesResult.data?.pages.flatMap(
      (page) => page
    );
    return (
      articlesListResult?.map((result) => {
        if (section !== 'General') {
          return {
            dateStr: result.dateStr,
            articles: result.articles[section],
          };
        } else {
          return {
            dateStr: result.dateStr,
            articles: Object.values(result.articles).flat(),
          };
        }
      }) || []
    );
  }
);
