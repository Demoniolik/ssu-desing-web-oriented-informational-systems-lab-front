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

    const [authorSelect, setAuthorSelect] = useState('');
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
            amountOfPages
        }).then(_response => {
            notify();
        });
    };;

    const handleSelectChange = (event: any) => {
        setAuthorSelect(event.target.value as string);
    }

    return (
        <>
            <BottomNavigation style={{ position: "relative", marginTop: "5%", width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("title")}
                        id="title"
                        name="title"
                        label="First name"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("description")}
                        id="description"
                        name="description"
                        label="Last name"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("amountOfPages")}
                        id="amountOfPages"
                        name="amountOfPages"
                        label="amountOfPages"
                        variant="outlined"
                        type="number"
                        style={{ marginBottom: "5%" }}
                    />

                    <TextField
                        {...register("datePublished")}
                        id="datePublished"
                        name="datePublished"
                        // label="datePublished"
                        variant="outlined"
                        type="date"
                        style={{ marginBottom: "5%" }}
                    />
                    <br />
                    <Select
                        id="authors"
                        label="Authors"
                        name="authorId"
                        value={authorSelect}
                        onChange={handleSelectChange}
                    >
                        {
                            authors.map(author => (
                                <MenuItem
                                    key={author.id}
                                    value={author.id}
                                >{`${author.firstName} ${author.lastName}`}</MenuItem>
                            ))
                        }

                    </Select>
                    <br />
                    <Button
                        type="submit"
                        variant="outlined">Add book</Button>
                </form>
            </BottomNavigation>
        </>
    );
}