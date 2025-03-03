import { FC } from 'react';
import { ArticleType } from '../../../entities/Article/model/types';
import { DateDivider } from './DateDivider';
import { Article } from '../../../entities/Article/ui/Article';
import styled from 'styled-components';

interface Props {
  dateStr: string;
  articles: ArticleType[];
}

const StyledDiv = styled.div`
  border-top: 1px solid rgba(237, 237, 237, 1);
`;

const StyledListItemDiv = styled.div`
  padding: 16px 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(237, 237, 237, 1);
  }
`;

export const ArticlesListContent: FC<Props> = ({ dateStr, articles }) => {
  return (
    <StyledDiv>
      <DateDivider date={dateStr} />
      {articles.map(({ web_url, multimedia, source, pub_date, snippet }) => (
        <StyledListItemDiv key={web_url}>
          <Article
            key={web_url}
            media={multimedia[0]}
            source={source}
            url={web_url}
            text={snippet}
            date={new Date(pub_date)}
          />
        </StyledListItemDiv>
      ))}
    </StyledDiv>
  );
};
