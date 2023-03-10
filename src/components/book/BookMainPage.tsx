import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Book } from '../../model/book.model';
import { Notifier } from '../../util/notifier';
import { CreateBookForm } from './CreateBookForm';
import { CancelOutlined } from '@material-ui/icons';
import { SearchBookInput } from './SearchAuthor';
import { SubmitHandler } from 'react-hook-form';

export const BookMainPage = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [update, setUpdate] = useState('');
    const BASE_API_URL = "http://localhost:3000/api/books";

    useEffect(() => {
        axios.get(BASE_API_URL, {})
            .then(response => {
                console.log(response);
                const books = response.data;
                setBooks(books);
            });
    }, [update]);

    const removeBookById = (id: number) => {
        axios.delete(`${BASE_API_URL}/${id}`, {

        }).then(respone => {
            console.log(`Books is deleted ${respone.status}`);
            setUpdate(`${id}`);
        })
            .catch(error => {
                console.log(error.message);
            })
    }

    const notify: Notifier = function (): void {
        setUpdate(crypto.randomUUID().toString());
    }

    const search: SubmitHandler<any> = ({ title }) => {
        console.log(`${BASE_API_URL}/${title}`)
        axios.get(`${BASE_API_URL}/${title}`, {})
            .then(response => {
                const book: any[] = response.data;
                console.log(book);
                setBooks(book);
            });
    }

    return (
        <>
            <h2>Books</h2>

            <SearchBookInput
                search={search}
            />

            <TableContainer style={{ width: "70%", margin: "0 auto" }}>
                <Table size="medium">
                    <TableHead>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date Published</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Pages</TableCell>
                        <TableCell>Remove?</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            books.map(book => (
                                <TableRow
                                    key={book.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {book.frontCover}
                                    </TableCell>
                                    <TableCell align="left">{book.title}</TableCell>
                                    <TableCell align="left">{book.description.substring(0, 15) + "..."}</TableCell>
                                    <TableCell align="left">{new Date(book.datePublished).toDateString()}</TableCell>
                                    <TableCell align="left">{`${book.author.firstName} ${book.author.lastName}`}</TableCell>
                                    <TableCell align='left'>{book.amountOfPages}</TableCell>
                                    <TableCell
                                        align='center'
                                        onClick={() => removeBookById(book.id)}
                                    >
                                        <IconButton>
                                            <CancelOutlined />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateBookForm
                notify={notify}
            />
        </>
    )
}