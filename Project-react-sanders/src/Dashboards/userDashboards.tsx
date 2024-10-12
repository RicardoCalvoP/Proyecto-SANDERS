import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const UserDashboard = (props: any) => {
    const location = useLocation();

    // Check if sidebar is present or not based on the route
    const isSidebarVisible = location.pathname !== '/donator' && location.pathname !== '/thank-you';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100vw',  // Ensure the full width of the viewport is used
                marginLeft: isSidebarVisible ? '250px' : '0px',  // Adjust left margin if sidebar is present
                transition: 'margin-left 0.3s', // Smooth transition for margin adjustment
            }}
        >
            <Box
                sx={{
                    padding: 1,
                    paddingTop: 3,
                    paddingBottom: 2,
                    maxWidth: { xs: '100%', sm: '600px', md: '800px' }, // Adjust width based on screen size
                    marginTop: '25px',
                    marginBottom: '10px',
                    borderRadius: '25px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 1)', // Soft shadow effect
                    width: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.8rem',
                    }}
                >
                    Crear donación
                </Typography>

                <Create {...props} resource="donaciones" title={" "} redirect={'/thank-you'}>
                    <SimpleForm
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '1.1rem', // Accessible font size for inputs
                            },
                            '& .MuiFormLabel-root': {
                                fontSize: '1.2rem', // Accessible font size for labels
                            },
                            '& .MuiButton-containedPrimary': {
                                backgroundColor: '#0a9396', // Accessible button color
                                '&:hover': {
                                    backgroundColor: '#007f82', // Contrast for hover state
                                },
                            },
                        }}
                    >
                        {/* First Name */}
                        <TextInput
                            source="donator_name"
                            label="Nombre"
                            resettable
                            fullWidth
                            required
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />

                        {/* Last Name */}
                        <TextInput
                            source="donator_surname"
                            label="Apellido"
                            resettable
                            fullWidth
                            required
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />

                        {/* Email */}
                        <TextInput
                            source="donator_email"
                            label="Correo"
                            resettable
                            fullWidth
                            required
                            type="email"
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />

                        {/* Phone */}
                        <TextInput
                            source="donator_phone"
                            label="Teléfono (opcional)"
                            resettable
                            fullWidth
                            type="tel"
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />

                        {/* Comment */}
                        <TextInput
                            source="comment"
                            label="Comentario (opcional)"
                            resettable
                            fullWidth
                            multiline
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />

                        {/* Amount */}
                        <NumberInput
                            source="amount"
                            label="Monto a donar"
                            fullWidth
                            required
                            inputProps={{
                                style: { marginTop: '10px' },
                            }}
                        />
                    </SimpleForm>
                </Create>
            </Box>
        </Box>
    );
};

export default UserDashboard;
