import React from 'react';
import { useMediaQuery, Theme, Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {
    List, Datagrid, TextField, DateField, NumberField, EmailField,
    Filter, TextInput, SelectInput
} from "react-admin";

// Custom Filter for Donations
const DonationFilter = (props: any) => (
    <Filter {...props}>
        {/* Filter by donor's name */}
        <TextInput label="Nombre" source="donator_name" alwaysOn />

        {/* Filter by donor's surname */}
        <TextInput label="Apellido" source="donator_surname" alwaysOn />

        {/* Filter by email */}
        <TextInput label="Correo" source="donator_email" alwaysOn />

        {/* Filter by donation type */}
        <SelectInput
            label="Tipo"
            source="kind"
            choices={[
                { id: 'En linea', name: 'En línea' },
                { id: 'Tarjeta', name: 'Tarjeta' },
                { id: 'Efectivo', name: 'Efectivo' },
                { id: 'Transferencia', name: 'Transferencia' }
            ]}
            alwaysOn
            emptyText="Ningún filtro"  // Texto for empty option
            parse={(value) => value === '' ? null : value}  // Analizar el valor vacío como nulo
        />

    </Filter>
);

// Main DonationsPage Component
const DonationsPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"));
    const navigate = useNavigate();

    const handleCreateDonation = () => {
        navigate('/admin/create/donations'); // Redirect to donation page
    };

    return (
        <Box sx={{
            paddingLeft: 4,
            paddingRight: 7,
            marginTop: -5,
            marginBottom: 5
        }}
        >

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={handleCreateDonation}
                    sx={{ height: '50px', marginBottom: '15px', backgroundColor: '#00304E', color: 'white' }}
                >
                    Crear Donación
                </Button>
            </Box>

            {/* Donation List Section */}
            <List filters={<DonationFilter />} pagination={false} resource="donations" title={"Donaciones"}>

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
                    <TextField source="donator_name" label="Nombre" />
                    <TextField source="donator_surname" label="Apellido" />
                    <EmailField source="donator_email" label="Email" />
                    <NumberField source="amount" label="Monto" />
                    <TextField source="kind" label="Tipo" />
                    <DateField source="date" label="Fecha" />
                    <TextField source="comment" label="Comentario" />
                    <TextField source="donator_phone" label="Teléfono" />
                </Datagrid>
            </List>

        </Box >
    );
};

export default DonationsPage;
