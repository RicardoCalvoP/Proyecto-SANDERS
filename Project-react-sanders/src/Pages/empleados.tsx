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
                <TextField source="id" sortable={false} />
                <TextField source="name" label='Nombre' sortable={true} />
                <TextField source="surname" label='Apellido' sortable={true} />
                <TextField source="rol" label='Rol' sortable={true} />
                <TextField source="phone" label='Telefono' sortable={false} />
                <EmailField source="email" label='Email' sortable={false} />
                <TextField source="password" label='Constraseña' sortable={false} />
            </Datagrid>
        </List>
    )
}


export const EmployeeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" label='Nombre' />
                <TextInput source="surname" label='Apellido' />
                <TextInput source="rol" label='Rol' />
                <TextInput source="phone" label='Telefono' />
                <TextInput source="email" label='Email' />
                <TextInput source="password" label='Contraseña' />
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
