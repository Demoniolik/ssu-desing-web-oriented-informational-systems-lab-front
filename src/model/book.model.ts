import { Author } from "./author.model";

export type Book = {
    id: number;
    title: string;
    datePublished: Date;
    description: string;
    amountOfPages: number;
    frontCover: string;
    author: Author;
}