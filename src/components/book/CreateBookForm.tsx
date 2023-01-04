import { BottomNavigation, Button, MenuItem, Select, TextField } from "@material-ui/core"
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Author } from "../../model/author.model";
import { Notifier } from "../../util/notifier";

type FormValues = {
    title: string;
    datePublished: Date,
    description: string,
    amountOfPages: number,
    frontCover: string,
    authorId: number,
}

type CreateBookFormProps = {
    notify: Notifier,
}

export const CreateBookForm = ({ notify }: CreateBookFormProps) => {

    const [authors, setAuthors] = useState<Author[]>([]);

    const AUTHORS_BASE_API_URL = "http://localhost:3000/api/authors";
    const BOOKS_BASE_API_URL = "http://localhost:3000/api/books";

    useEffect(() => {
        axios.get(AUTHORS_BASE_API_URL, {})
            .then(response => {
                console.log(response);
                const authors = response.data;
                setAuthors(authors);
            });
    }, []);

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const { title, description, frontCover, authorId, datePublished, amountOfPages } = data;
        axios.post(BOOKS_BASE_API_URL, {
            title,
            description,
            frontCover,
            authorId,
            datePublished,
            amountOfPages,
        }).then(_response => {
            notify();
        }).catch(error => {
            console.log(error.message);
        });
    };

    return (
        <>
            <BottomNavigation style={{ position: "relative", marginTop: "5%", width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("title")}
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("description")}
                        id="description"
                        name="description"
                        label="Descripton"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("amountOfPages")}
                        id="amountOfPages"
                        name="amountOfPages"
                        label="Amount of pages"
                        variant="outlined"
                        type="number"
                        style={{ marginBottom: "5%" }}
                    />

                    <TextField
                        {...register("datePublished")}
                        id="datePublished"
                        name="datePublished"
                        label="Date published"
                        variant="outlined"
                        type="date"
                        style={{ marginBottom: "5%" }}
                    />
                    <br />
                    <TextField
                        {...register("frontCover")}
                        id="frontCover"
                        name="frontCover"
                        label="Front cover"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />

                    <TextField
                        {...register("authorId")}
                        select
                        variant="outlined"
                    >
                        {
                            authors.map(author => (
                                <MenuItem key={author.id} value={author.id}>{`${author.firstName}  ${author.lastName}`}</MenuItem>
                            ))
                        }
                    </TextField>

                    {/* <select
                        {...register("authorId")}
                    >
                        {
                            authors.map(author => (
                                <option value={author.id}>{`${author.firstName}  ${author.lastName}`}</option>
                            ))
                        }
                    </select> */}

                    <br />
                    <Button
                        type="submit"
                        variant="outlined">Add book</Button>
                </form>
            </BottomNavigation>
        </>
    );
}