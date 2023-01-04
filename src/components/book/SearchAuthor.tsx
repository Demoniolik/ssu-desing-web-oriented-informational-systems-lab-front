import { IconButton, InputBase, Paper } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";

type SearchProps = {
    search: SubmitHandler<any>,
}

type FormValues = {
    title: string,
}

export const SearchBookInput = ({ search }: SearchProps) => {

    const { register, handleSubmit } = useForm<FormValues>();

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(search)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: 400, margin: "3% auto" }}
        >
            <InputBase
                {...register("title")}
                placeholder="Search..."
                style={{ padding: "0 5%" }}
            />
            <IconButton
                type="submit"
                style={{ position: "relative", float: "right" }}
            >
                <SearchOutlined />
            </IconButton>

        </Paper>
    )
}