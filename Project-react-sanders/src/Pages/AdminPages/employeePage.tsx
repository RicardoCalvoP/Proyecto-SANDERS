import React from 'react';
import { useMediaQuery, Theme, Box, Button } from "@mui/material";
import { List, Datagrid, TextInput, Filter, SelectInput, TextField, EmailField, NumberField } from 'react-admin';
import { useNavigate } from 'react-router-dom';

// Custom Filter for Employees
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
const EmployeesPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"));
    const navigate = useNavigate();

    const handleCreateDonation = () => {
        navigate('/admin/create/employee'); // Redirect to donation page
    };

    return (

        <Box sx={{
            paddingLeft: 4,
            paddingRight: 7,
            marginTop: -5,
            marginBottom: 5

        }}
        >

            <Box sx={{ display: 'flex', justifyContent: 'center' }}> {/* Centra el botón en el eje X */}
                <Button
                    variant="contained"
                    onClick={handleCreateDonation}
                    sx={{ height: '50px', marginBottom: '15px', backgroundColor: '#00304E', color: 'white' }}
                >
                    Crear Empleado
                </Button>
            </Box>

            {/* Donation List Section */}
            <List filters={<EmployeeFilter />} pagination={false} resource="employees" title={"Empleados"}>

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
                    <TextField source="rol" label="Rol" />
                    <TextField source="phone" label="Teléfono" />
                    <EmailField source="email" label="Email" />
                </Datagrid>
            </List>

        </Box >
    );
};

export default EmployeesPage;
