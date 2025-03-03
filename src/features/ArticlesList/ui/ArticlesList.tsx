import styled from 'styled-components';
import { useAppSelector } from '../../../app/hooks';
import {
  selectMapArticlesByDate,
  useGetInfiniteArticlesInfiniteQuery,
} from '../api/api';
import { ArticlesListContent } from './ArticlesListContent';
import { Loader } from '../../Loader/ui/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

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
      <InfiniteScroll
        dataLength={articles.size}
        next={fetchNextPage}
        hasMore={true}
        loader={<Loader />}
        scrollThreshold={'300px'}
      >
        {Array.from(articles.entries()).map(([key, articles]) => {
          return (
            <ArticlesListContent key={key} dateStr={key} articles={articles} />
          );
        })}
        <button onClick={() => fetchNextPage()}>Load more</button>
        {(isLoading || isFetching) && <Loader />}
      </InfiniteScroll>
    </StyledDiv>
  );
};
