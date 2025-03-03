import { FC } from 'react';
import styles from './styles.module.css';
import { Media } from '../model/types';

const BASE_IMAGES_URL = 'https://www.nytimes.com/';

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
          loading="lazy"
          className={styles.article_media}
          height={media.height}
          width={media.width}
          src={BASE_IMAGES_URL + media.url}
          alt={media.caption}
        />
      )}
      <p className={styles.article_text}>{text}</p>
      <p className={styles.article_date}>
        {date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>
    </article>
  );
};
