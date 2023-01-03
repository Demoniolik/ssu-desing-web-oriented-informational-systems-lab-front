import axios from "axios";
import { useEffect, useState } from "react";
import { Author } from "../../model/author.model";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { CreateAuthorForm } from "./CreateAuthorForm";
import { Notifier } from "../../util/notifier";

export const AuthorMainPage = () => {

    const [authors, setAuthors] = useState<Author[]>([]);
    const [update, setUpdate] = useState('');
    const BASE_API_URL = "http://localhost:3000/api/authors";

    useEffect(() => {
        axios.get(BASE_API_URL, {})
            .then(response => {
                console.log(response);
                const authors = response.data;
                setAuthors(authors);
            });
    }, [update]);

    const removeAuthorById = (id: number) => {
        axios.delete(`${BASE_API_URL}/${id}`, {

        }).then(respone => {
            console.log(`Author is deleted ${respone.status}`);
            setUpdate(`${id}`);
        })
            .catch(error => {
                console.log(error.message);
            })
    }

    const notify: Notifier = function (): void {
        setUpdate(crypto.randomUUID().toString());
    }

    return (
        <>
            <h2>Authors</h2>
            <TableContainer style={{ width: "40%", margin: "0 auto" }}>
                <Table size="medium">
                    <TableHead>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Remove?</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            authors.map(author => (
                                <TableRow
                                    key={author.id}
                                >
                                    <TableCell align="left">{author.firstName}</TableCell>
                                    <TableCell align="left">{author.lastName}</TableCell>
                                    <TableCell align="left">{author.country}</TableCell>
                                    <TableCell
                                        align='center'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeAuthorById(author.id)}
                                    >X</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateAuthorForm
                notify={notify}
            />
        </>
    )
}