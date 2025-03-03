import { useAppSelector } from '../../../app/hooks';
import { ArticleType } from '../../../entities/Article/model/types';
import { Article } from '../../../entities/Article/ui/Article';
import {
  selectArticlesBySection,
  useGetInfiniteArticlesInfiniteQuery,
} from '../api/api';

export const ArticlesList = () => {
  const { fetchNextPage, isFetching, isLoading } =
    useGetInfiniteArticlesInfiniteQuery(
      {},
      { pollingInterval: +(import.meta.env.VITE_POLLING_INTERVAL || 30000) }
    );

  const articles = useAppSelector(selectArticlesBySection);

  return (
    <>
      <button onClick={() => fetchNextPage()}>Load more</button>
      {articles?.map((article: ArticleType) => {
        const media = article.multimedia[0];
        return (
          <Article
            key={article.web_url}
            media={media}
            source={article.source}
            text={article.snippet}
            date={new Date(article.pub_date)}
            url={article.web_url}
          />
        );
      })}
      {(isLoading || isFetching) && <p>LOADING...</p>}
    </>
  );
};
