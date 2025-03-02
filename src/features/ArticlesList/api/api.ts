import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleType as Article } from '../../../entities/Article/model/types';

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
          pageDate.setMonth(pageDate.getMonth() + 1);

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
