import React from 'react';
import { Box, Typography } from '@mui/material';
import WeekChart from '../Pages/Charts/weekDonations';
import LastDonations from '../Pages/Charts/lastDonations';
import TypeDonation from '../Pages/Charts/typeDonation';
import TopDonorsByCount from '../Pages/Charts/topDonatorsByCount';
import TopDonorsByAmount from '../Pages/Charts/topDonatorsByAmount';

const Overview = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around' }}>

            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <LastDonations />
            </Box>

            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <WeekChart />
            </Box>

            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TypeDonation />
            </Box>
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <h3>Algo va a ir aqui</h3>            </Box>

            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TopDonorsByCount />
            </Box>
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TopDonorsByAmount />
            </Box>
        </Box>


    );
};

export default Overview;
