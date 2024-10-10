import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}>
                <Typography variant="subtitle1" color="black">
                    {label}
                </Typography>
                <Typography variant="h6" color="#00304E">
                    {`Donaciones: ${payload[0].value}`}
                </Typography>
            </Box>
        );
    }

    return null;
};

const WeekChart = () => {
    const [donationData, setDonationData] = useState([]);

    useEffect(() => {
        // Llamada al API para obtener donaciones por día en los últimos 7 días
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:5001/donations/week'); // Llamada al API
                const formattedData = response.data.map((item: any) => ({
                    day: item.day,  // Fecha en formato YYYY-MM-DD
                    donations: item.donations // Cantidad de donaciones por día
                }));
                setDonationData(formattedData);
            } catch (error) {
                console.error('Error fetching donation data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{
            margin: '25px', padding: 4, textAlign: 'center', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.7)', borderRadius: '25px', height: '575px'
        }}>
            <Box sx={{ marginBottom: '55px' }}>
                <Typography variant="h3" gutterBottom>
                    Donaciones en los últimos 7 días
                </Typography >
            </Box>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={donationData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="day"
                        angle={15}
                        tickMargin={10}
                        interval={0}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} /> {/* Tooltip personalizado */}
                    <Line type="monotone" dataKey="donations" activeDot={{ r: 7 }} />
                </LineChart>
            </ResponsiveContainer>

        </Box>
    );
};

export default WeekChart;
