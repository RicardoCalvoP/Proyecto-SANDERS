import React from 'react';
import { Box, Typography } from '@mui/material';
import WeekChart from '../Pages/Charts/weekDonations';
import LastDonations from '../Pages/Charts/lastDonations';
import TypeDonation from '../Pages/Charts/typeDonation';
import TopDonorsByCount from '../Pages/Charts/topDonatorsByCount';
import TopDonorsByAmount from '../Pages/Charts/topDonatorsByAmount';

const Overview = () => {
    const identity = JSON.parse(localStorage.getItem('identity') || '{}');
    const userRol = identity.rol;
    if (userRol === "Admin") {
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
    }
    else {
        return (<Box><h2>Error 401</h2></Box>);
    }
};

export default Overview;
