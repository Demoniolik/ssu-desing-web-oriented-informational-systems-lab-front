import { BottomNavigation, Button, FormControl, MenuItem, Select, TextField } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Notifier } from "../../util/notifier";

type CreateAuthorProps = {
    notify: Notifier,
}

type FormValues = {
    firstName: string,
    lastName: string,
    country: string,
}


export const CreateAuthorForm = ({ notify }: CreateAuthorProps) => {

    const BASE_API_URL = "http://localhost:3000/api/authors";

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const { firstName, lastName, country } = data;
        axios.post(BASE_API_URL, {
            firstName,
            lastName,
            country,
        }).then(_response => {
            notify();
        });
    };;

    return (
        <>
            <BottomNavigation style={{ position: "relative", marginTop: "5%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("firstName")}
                        id="firstName"
                        name="firstName"
                        label="First name"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("lastName")}
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />
                    <TextField
                        {...register("country")}
                        id="country"
                        name="country"
                        label="Country"
                        variant="outlined"
                        style={{ marginBottom: "5%" }}
                    />

                    <Button
                        type="submit"
                        variant="outlined">Add author</Button>
                </form>
            </BottomNavigation>
        </>
    )
}