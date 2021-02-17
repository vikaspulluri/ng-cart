import { Book } from '../book/book.model';

export interface SearchResult {
  items: Book[];
  kind: string;
  totalItems: number;
}
