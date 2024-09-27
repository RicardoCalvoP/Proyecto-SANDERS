import { useMediaQuery, Theme } from "@mui/material";
import {
    List, Datagrid, TextField, EmailField,
    Edit, EditButton, TextInput, Filter, SelectInput,
    Create, SimpleForm
} from "react-admin";

// Filter for Employees
const EmployeeFilter = (props: any) => (
    <Filter {...props}>
        {/* TextInput filter by name */}
        <TextInput label="Nombre" source="name" alwaysOn />
        {/* TextInput filter by surname */}
        <TextInput label="Apellido" source="surname" alwaysOn />
        {/* SelectInput  filter by rol */}
        <SelectInput label="Rol" source="rol" choices={[
            { id: 'Admin', name: 'Admin' },
            { id: 'Usuario', name: 'Usuario' }
        ]}
            alwaysOn
            emptyText="Ninguno filtro"  // Text for the empty option
            parse={(value) => value === '' ? null : value} // Parse empty string to null
        />
        {/* TextInput filter by mail */}
        <TextInput label="Correo" source="email" alwaysOn />


    </Filter>
);

export const EmployeeList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (
        <List filters={<EmployeeFilter />}>
            <Datagrid>
                <TextField source="id" sortable={false} />
                <TextField source="name" label="Nombre" sortable={true} />
                <TextField source="surname" label="Apellido" sortable={true} />
                <TextField source="rol" label="Rol" sortable={true} />
                <TextField source="phone" label="Telefono" sortable={false} />
                <EmailField source="email" label="Email" sortable={false} />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export const EmployeeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" label='Nombre' resettable />
                <TextInput source="surname" label='Apellido' resettable />
                {/* Rol field with SelectInput instead of TextInput */}
                <SelectInput
                    source="rol"
                    label="Rol"
                    choices={[
                        { id: 'Admin', name: 'Admin' },
                        { id: 'Usuario', name: 'Usuario' }
                    ]}
                />                <TextInput source="phone" label='Telefono' resettable />
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