import { FC } from 'react';
import styles from './styles.module.css';
import { Media } from '../model/types';

interface Props {
  media?: Media;
  source?: string;
  text: string;
  date: Date;
  url: string;
}

export const Article: FC<Props> = ({ media, source, text, date, url }) => {
  return (
    <article className={styles.article_grid}>
      <a className={styles.article_source} href={url}>
        {source}
      </a>
      {media && (
        <img
          className={styles.article_media}
          height={media.height}
          width={media.width}
          src={media.url}
          alt={media.caption}
        />
      )}
      <p className={styles.article_text}>{text}</p>
      <p className={styles.article_date}>
        {date.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeStyle: 'short',
        })}
      </p>
    </article>
  );
};
