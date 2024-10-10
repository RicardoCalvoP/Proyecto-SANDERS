import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const TopDonorsByCount = () => {
    const [topDonorsByCount, setTopDonorsByCount] = useState([]);

    useEffect(() => {
        // Fetch top donors by number of donations
        const fetchTopDonorsByCount = async () => {
            try {
                const response = await axios.get('https://localhost:5001/donations/top-donors-by-count');
                setTopDonorsByCount(response.data);
            } catch (error) {
                console.error('Error fetching top donors by count:', error);
            }
        };

        fetchTopDonorsByCount();
    }, []);

    return (
        <Box sx={{ margin: '25px', padding: 4, textAlign: 'center', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.7)', borderRadius: '25px', height: '575px' }}>

            <Box sx={{ marginBottom: '55px' }}>
                <Typography variant="h4" gutterBottom>Top 3 Donors by Donation Count</Typography>
            </Box>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topDonorsByCount}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TopDonorsByCount;
