import { Box, Typography } from '@mui/material';
import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";


const RecentDonations = () => {
    return (
        <Box sx={{ marginTop: '25px', padding: '10px' }}>
            <Typography variant="h3" gutterBottom>Últimas Donaciones</Typography>

            {/* Contenedor para la lista y la gráfica en modo flex */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                {/* Listado de donaciones */}
                <Box sx={{ flex: 1 }}>
                    <List resource="donations/recent/10" pagination={false} title=" ">
                        <Datagrid bulkActionButtons={false}
                            sx={{
                                '& .RaDatagrid-rowCell': {
                                    textAlign: 'center', // Centra el texto en las celdas de los datos
                                },
                                '& .RaDatagrid-headerCell': {
                                    textAlign: 'center', // Centra el texto en los títulos de las columnas
                                },
                            }}>
                            <TextField source="donator_name" label="Nombre" />
                            <TextField source="donator_surname" label="Apellido" />
                            <NumberField source="amount" label="Monto" />
                            <DateField source="date" label="Fecha" />
                        </Datagrid>
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default RecentDonations