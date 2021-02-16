export type Book = {
  kind: string;
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    description: string;
    averageRating: number;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    pageCount: number;
    publishedDate: string;
    publisher: string;
    ratingsCount: number;
  };
};
