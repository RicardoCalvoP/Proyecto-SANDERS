import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, EmailField, NumberField,
    SimpleForm, TextInput, NumberInput,
    Create
} from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="nombre" />
                <TextField source="apellido" />
                <EmailField source="email" />
                <TextField source="telefono " />
                <NumberField source="numero de doncaciones" />
            </Datagrid>
        </List>
    )
}

export const UsersCreate = () => {
    return (

        <Create>
            <SimpleForm>
                <TextInput source="nombre" />
                <TextInput source="apellido" />
                <TextInput source="email" />
                <NumberInput source="telefono" />
            </SimpleForm>
        </Create>
    )
}