import React from 'react';
import { useMediaQuery, Theme, Box, Button } from "@mui/material";
import { List, Datagrid, TextInput, Filter, TextField, EmailField, NumberField } from 'react-admin';

// Custom Filter for Users
const UsersFilter = (props: any) => (
    <Filter {...props}>
        {/* Filter by donor's name */}
        <TextInput label="Nombre" source="name" alwaysOn />

        {/* Filter by donor's surname */}
        <TextInput label="Apellido" source="surname" alwaysOn />

        {/* Filter by email */}
        <TextInput label="Correo" source="email" alwaysOn />
    </Filter>
);

// Main UserPage Component
const UsersPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"));

    return (
        <Box sx={{
            paddingLeft: 4,
            paddingRight: 7,
            marginTop: -5,
            marginBottom: 5
        }}>

            {/* Donation List Section */}
            <List filters={<UsersFilter />} pagination={false} resource="users" title={"Usuarios"}>

                <Datagrid
                    bulkActionButtons={false}
                    sx={{
                        '& .RaDatagrid-rowCell': {
                            textAlign: 'center', // Centra el texto en las celdas de los datos
                        },
                        '& .RaDatagrid-headerCell': {
                            textAlign: 'center', // Centra el texto en los títulos de las columnas
                        },
                    }}
                >
                    <TextField source="name" label="Nombre" />
                    <TextField source="surname" label="Apellido" />
                    <EmailField source="email" label="Email" />
                    <TextField source="phone" label="Teléfono" />
                    <NumberField source="num_donations" label="Numero de Donaciones" />
                </Datagrid>
            </List>

        </Box>
    );
};

export default UsersPage;
