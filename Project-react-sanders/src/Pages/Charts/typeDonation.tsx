import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

// Define the fixed colors (Green, Yellow, Orange, Red)
const COLORS = ['#1FC600', '#FFBB28', '#FF8042', '#FF4F42']; // Green, Yellow, Orange, Red

interface DonationType {
    name: string;
    value: number;
}

const TypeDonationChart = () => {
    const [typeData, setTypeData] = useState<DonationType[]>([]);

    useEffect(() => {
        // Fetch donation type data from the API
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('https://localhost:5001/donations/types', config);
                const formattedData: DonationType[] = Object.keys(response.data).map((key) => ({
                    name: key,
                    value: response.data[key],
                }));

                // Sort data by value (number of donations) in descending order
                formattedData.sort((a, b) => b.value - a.value);

                // Set the sorted data
                setTypeData(formattedData);
            } catch (error) {
                console.error('Error fetching donation type data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ margin: '25px', padding: 4, textAlign: 'center', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.7)', borderRadius: '25px', height: '575px' }}>
            <Typography variant="h3" gutterBottom>
                Tipos de donación
            </Typography>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={typeData}
                        cx="50%" // Center the pie horizontally
                        cy="50%" // Center the pie vertically
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value" // Use "value" for the size of the slices
                        label
                    >
                        {typeData.map((entry, index) => (
                            // Assign colors dynamically based on the sorted order
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TypeDonationChart;
