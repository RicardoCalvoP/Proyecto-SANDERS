import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
    const location = useLocation();

    const isSidebarVisible = location.pathname !== '/thank-you'
    const navigate = useNavigate();

    // Function to redirect to donation forms
    const handleBackToForm = () => {
        navigate('/donator');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginLeft: isSidebarVisible ? '250px' : '0px',  // Adjust left margin if sidebar is present
                height: '40vw',  // Ensure the full width of the viewport is used
                flexDirection: 'column',
                alignItems: 'center',
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
