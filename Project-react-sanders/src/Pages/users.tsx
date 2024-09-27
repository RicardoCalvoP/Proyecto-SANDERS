import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, EmailField, NumberField, ListProps,
    SimpleForm, TextInput, Filter, SelectInput,
    Create
} from "react-admin";

// Filter for Users
const UsersFilter = (props: any) => (
    <Filter {...props}>
        {/* TextInput filter by name */}
        <TextInput label="Nombre" source="name" alwaysOn />
        {/* TextInput filter by surname */}
        <TextInput label="Apellido" source="surname" alwaysOn />
        {/* TextInput filter by mail */}
        <TextInput label="Correo" source="email" alwaysOn />


    </Filter>
);

export const UserList = (props: ListProps) => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (
        <List filters={<UsersFilter />} {...props}>
            <Datagrid>
                <TextField source="name" sortable={true} />
                <TextField source="surname" sortable={true} />
                <EmailField source="email" sortable={false} />
                <TextField source="phone" sortable={false} />
                <NumberField source="num_donations" sortable={true} />
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
