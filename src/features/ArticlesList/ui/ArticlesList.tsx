import { ArticleType } from '../../../entities/Article/model/types';
import { Article } from '../../../entities/Article/ui/Article';
import { useGetInfiniteArticlesInfiniteQuery } from '../api/api';

export const ArticlesList = () => {
  const { data, fetchNextPage } = useGetInfiniteArticlesInfiniteQuery({});

  const articles = data?.pages.flatMap((page) => page) ?? [];

  return (
    <>
      <button onClick={() => fetchNextPage()}>Load more</button>
      {articles.map((article: ArticleType) => {
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
    </>
  );
};
