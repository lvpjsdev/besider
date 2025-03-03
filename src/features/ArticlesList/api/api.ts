import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleType as Article } from '../../../entities/Article/model/types';
import { type RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectMenuState } from '../../Menu/store/menuSlice';

interface ArticlesListResponse {
  response: {
    docs: Article[];
  };
}

interface ArticlesListParams {
  year: number;
  month: number;
}

type GetArticlesListResult = Article[];

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
        return response.response.docs;
      },
    }),
  }),
});

export const { useGetInfiniteArticlesInfiniteQuery } = articlesApi;

export const selectArticlesBySection = createSelector(
  (state: RootState) =>
    articlesApi.endpoints.getInfiniteArticles.select({})(state),
  selectMenuState,
  (articlesResult, menuState) => {
    const articles = articlesResult.data?.pages.flatMap((page) => page);
    return articles?.filter((article) => {
      if (menuState.section === 'General') {
        return true;
      } else {
        return article.section_name === menuState.section;
      }
    });
  }
);
