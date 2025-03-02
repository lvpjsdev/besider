export type Media = {
  caption: string;
  type: string;
  url: string;
  height: number;
  width: number;
};

export type ArticleType = {
  web_url: string;
  snippet: string;
  pub_date: string;
  source: string;
  section_name: string;
  multimedia: Media[];
};
