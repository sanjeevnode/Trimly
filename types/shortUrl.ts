export type TShortUrl = {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  clicked: number;
  createdAt?: Date;
  updatedAt?: Date;
};
