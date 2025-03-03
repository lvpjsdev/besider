import styled from 'styled-components';
import { useAppSelector } from '../../../app/hooks';
import {
  selectMapArticlesByDate,
  useGetInfiniteArticlesInfiniteQuery,
} from '../api/api';
import { ArticlesListContent } from './ArticlesListContent';

const StyledDiv = styled.div`
  margin: 0 20px;
`;

export const ArticlesList = () => {
  const { fetchNextPage, isFetching, isLoading } =
    useGetInfiniteArticlesInfiniteQuery(
      {},
      { pollingInterval: +(import.meta.env.VITE_POLLING_INTERVAL || 30000) }
    );

  const articles = useAppSelector(selectMapArticlesByDate);

  return (
    <StyledDiv>
      {Array.from(articles.entries()).map(([key, articles]) => {
        return (
          <ArticlesListContent key={key} dateStr={key} articles={articles} />
        );
      })}
      <button onClick={() => fetchNextPage()}>Load more</button>
      {(isLoading || isFetching) && <p>LOADING...</p>}
    </StyledDiv>
  );
};
