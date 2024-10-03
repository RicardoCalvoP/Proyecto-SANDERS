import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios'; // Para hacer la solicitud a la API
import { Box, Typography } from '@mui/material';

const DonationBarChart = () => {
    const [data, setData] = useState([]); // Estado para guardar los datos de la API
    const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

    // Función para obtener los datos de la API
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:5001/donaciones/ultimos7dias'); // Asegúrate de usar la ruta correcta
            setData(response.data);
            setLoading(false); // Cuando ya se han cargado los datos
        } catch (error) {
            console.error('Error fetching donation data:', error);
            setLoading(false);
        }
    };

    // Ejecutar el fetchData cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // Si está cargando, mostrar un mensaje de carga
    if (loading) {
        return <Typography>Cargando datos de donaciones...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', height: 400 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Donaciones de los últimos 7 días
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" /> {/* Eje X basado en los días */}
                    <YAxis /> {/* Eje Y basado en el número de donaciones */}
                    <Tooltip /> {/* Tooltip que muestra información adicional */}
                    <Bar dataKey="donations" fill="#8884d8" /> {/* Barras */}
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default DonationBarChart;
