import React from 'react';
import { Box, Typography } from '@mui/material';
import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";
import WeekChart from '../Pages/Charts/weekDonations';
import LastDonations from '../Pages/Charts/lastDonations';

const Overview = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around' }}>
            {/* Lista de últimas donaciones */}
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <LastDonations />
            </Box>

            {/* Gráfica de donaciones semanales */}
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <WeekChart />
            </Box>

            {/* Tercer elemento */}
            <Box sx={{ flex: 1, minWidth: '40%', marginTop: '20px' }}> {/* Ocupa toda la fila */}
                <h2>Tercer Elemento</h2>
            </Box>
        </Box>


    );
};

export default Overview;
