import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
    const navigate = useNavigate();

    // Function to redirect to donation forms
    const handleBackToForm = () => {
        navigate('/donator');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 4,
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                ¡Gracias por tu ayuda!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Tu donación fue mandada con éxito
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToForm}
                sx={{ marginTop: 3 }}
            >
                Donar otra vez
            </Button>
        </Box>
    );
};

export default ThankYouPage;
