import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const TopDonorsByAmount = () => {
    const [topDonorsByAmount, setTopDonorsByAmount] = useState([]);

    useEffect(() => {
        // Fetch top donors by total amount donated
        const fetchTopDonorsByAmount = async () => {
            try {
                const response = await axios.get('https://localhost:5001/donations/top-donors-by-amount');
                setTopDonorsByAmount(response.data);
            } catch (error) {
                console.error('Error fetching top donors by amount:', error);
            }
        };

        fetchTopDonorsByAmount();
    }, []);

    // Format with sign and separation with commas
    const formatCurrency = (value: number) => {
        return `$${value.toLocaleString('en-US')}`; // Add pesos symbol and commas 
    };

    return (
        <Box sx={{ margin: '25px', padding: 4, textAlign: 'center', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.7)', borderRadius: '25px', height: '575px' }}>

            <Box sx={{ marginBottom: '55px' }}>
                <Typography variant="h4" gutterBottom >Top 3 Donors by Total Donation Amount</Typography>
            </Box>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topDonorsByAmount}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="_id"
                        height={75}
                        angle={15}
                        tickMargin={20}
                        interval={0}
                    />
                    <YAxis
                        tickFormatter={formatCurrency} // Format Y axis
                    />
                    <Tooltip
                        formatter={(value) => formatCurrency(Number(value))} // Format tooltip
                    />
                    <Bar dataKey="totalAmount" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TopDonorsByAmount;
