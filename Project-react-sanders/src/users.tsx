import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, EmailField, NumberField, ListProps,
    SimpleForm, TextInput, NumberInput,
    Create
} from "react-admin";

export const UserList = (props: ListProps) => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="surname" />
                <EmailField source="email" />
                <TextField source="phone" />
                <NumberField source="num_donations" />
            </Datagrid>
        </List>
    )
}

export const UsersCreate = (props: any) => {
    return (

        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="surname" />
                <TextInput source="email" />
                <TextInput source="phone" />
            </SimpleForm>
        </Create>
    )
}
