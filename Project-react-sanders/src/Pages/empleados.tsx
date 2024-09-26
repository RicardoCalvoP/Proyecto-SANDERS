import { useMediaQuery, Theme } from "@mui/material";


import {
    List, Datagrid, TextField, EmailField,
    Edit, EditButton, SimpleForm, TextInput,
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
                <TextInput source="name" label='Nombre' resettable />
                <TextInput source="surname" label='Apellido' resettable />
                <TextInput source="rol" label='Rol' resettable />
                <TextInput source="phone" label='Telefono' resettable />
                <TextInput source="email" label='Email' resettable />
                <TextInput source="password" label='Contraseña' resettable />
            </SimpleForm>
        </Create>
    )
}

export const EmployeeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" inputProps={{ disabled: true }} />
                <TextInput source="name" inputProps={{ disabled: true }} />
                <TextInput source="surname" inputProps={{ disabled: true }} />
                <TextInput source="rol" inputProps={{ disabled: true }} />
                <TextInput source="phone" inputProps={{ disabled: true }} />
                <TextInput source="email" inputProps={{ disabled: true }} />

                {/* Password field without showing the previous value */}
                <TextInput
                    source="password"
                    label="Nueva Contraseña"
                    type="password"
                    resettable
                />
            </SimpleForm>
        </Edit>
    );
};