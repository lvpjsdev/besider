import styled from 'styled-components';
import { useAppSelector } from '../../../app/hooks';
import {
  selectArticlesBySection,
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
    useGetInfiniteArticlesInfiniteQuery({
      pollingInterval: +(import.meta.env.VITE_POLLING_INTERVAL || 60000),
    });

  const articles = useAppSelector(selectArticlesBySection);

  return (
    <StyledDiv>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchNextPage}
        hasMore={!isLoading && !isFetching}
        loader={<Loader />}
      >
        {articles.map(({ dateStr, articles }) => (
          <ArticlesListContent
            key={dateStr}
            dateStr={dateStr}
            articles={articles}
          />
        ))}
      </InfiniteScroll>
    </StyledDiv>
  );
};
