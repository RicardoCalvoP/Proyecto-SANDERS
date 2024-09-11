import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, ReferenceField, EmailField, NumberField, DateField,
    Edit, EditButton, SimpleForm, TextInput, ReferenceInput, NumberInput, DateInput,
    Create
} from "react-admin";

export const EmployeeList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (

        <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="surname" />
                <TextField source="rol" />
                <TextField source="phone" />
                <EmailField source="email" />
                <TextField source="password" />
            </Datagrid>
        </List>
    )
}


export const EmployeeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="surname" />
                <TextInput source="rol" />
                <TextInput source="phone" />
                <TextInput source="email" />
                <TextInput source="password" />
            </SimpleForm>
        </Create>
    )
}


export const EmployeeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" inputProps={{ disabled: true }} />
                <TextInput source="nombre" />
                <TextInput source="apellido" />
                <TextInput source="rol" />
                <TextInput source="telefono" />
                <TextInput source="email" />
                <TextInput source="constraseña" />
            </SimpleForm>
        </Edit>
    )
}
