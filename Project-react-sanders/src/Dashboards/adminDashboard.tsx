import React from 'react';
import { Box, Typography } from '@mui/material';
import WeekChart from '../Pages/Charts/weekDonations';
import LastDonations from '../Pages/Charts/lastDonations';
import TypeDonation from '../Pages/Charts/typeDonation';
import TopDonorsByCount from '../Pages/Charts/topDonatorsByCount';
import TopDonorsByAmount from '../Pages/Charts/topDonatorsByAmount';

const Overview = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around', marginTop: -10 }}>


            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <LastDonations />
            </Box>
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TypeDonation />
            </Box>

            <Box sx={{ flex: 1, minWidth: '70%' }}>
                <WeekChart />
            </Box>


            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TopDonorsByAmount />
            </Box>
            <Box sx={{ flex: 1, minWidth: '40%' }}>
                <TopDonorsByCount />
            </Box>
        </Box>


    );
};

export default Overview;
