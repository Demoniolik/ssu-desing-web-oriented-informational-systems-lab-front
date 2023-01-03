import { BottomNavigation, Button, FormControl, MenuItem, Select, TextField } from "@material-ui/core"
import axios from "axios";
import { useEffect, useState } from "react"
import { Author } from "../../model/author.model";

export const CreateAuthorForm = () => {

    const [authors, setAuthors] = useState<Author[]>([]);
    const [authorSelect, setAuthorSelect] = useState("");
    const BASE_API_URL = "http://localhost:3000/api/authors";

    useEffect(() => {
        //TODO: use props authors instead of request
        axios.get(BASE_API_URL, {})
            .then(response => {
                const authors = response.data;
                setAuthors(authors);
            });
    }, []);

    const handleSelectChange = (event: any) => {
        setAuthorSelect(event.target.value as string);
    }

    const handleFormSubmit = (event: any) => {

    }

    return (
        <>
            <BottomNavigation style={{ position: "relative", marginTop: "5%" }}>
                <FormControl>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        id="amountOfPages"
                        label="Amount of pages"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <Select
                        id="authors"
                        label="Authors"
                        value={authorSelect}
                        onChange={handleSelectChange}
                    >
                        {
                            authors.map(author => (
                                <MenuItem
                                    key={author.id}
                                    value={`${author.firstName} ${author.lastName}`}
                                >{`${author.firstName} ${author.lastName}`}</MenuItem>
                            ))
                        }

                    </Select>

                    {/* TODO: Add DateTimePicker, number input, */}

                    <Button
                        variant="outlined"
                        onClick={handleFormSubmit}
                    >Add author</Button>
                </FormControl>
            </BottomNavigation>
        </>
    )
}