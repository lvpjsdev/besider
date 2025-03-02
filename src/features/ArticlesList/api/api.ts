import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../../../entities/Article/model/types';

interface ArticlesListResponse {
  response: {
    docs: Article[];
  };
}

interface ArticlesListParams {
  year: number;
  month: number;
}

type GetArticlesListResult = {
  dateParam: Date;
  articles: Article[];
};

const nowDate = new Date();

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nytimes.com/svc/archive/v1/',
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
        getNextPageParam: (lastPage) => {
          const pageParam = new Date(
            lastPage.dateParam.setMonth(lastPage.dateParam.getMonth() + 1)
          );
          return {
            year: pageParam.getFullYear(),
            month: pageParam.getMonth() + 1,
          };
        },
      },
      query: ({ pageParam: { year, month } }) =>
        `${year}/${month}.json?api-key=${import.meta.env.VITE_API_KEY}`,
      transformResponse: (response: ArticlesListResponse, _meta, arg) => {
        const dateParam = new Date(arg.pageParam.year, arg.pageParam.month - 1);
        return {
          dateParam,
          articles: response.response.docs,
        };
      },
    }),
  }),
});

export const { useGetInfiniteArticlesInfiniteQuery } = articlesApi;
