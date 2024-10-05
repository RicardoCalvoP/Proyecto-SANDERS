import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';
import { Box, Typography } from '@mui/material';

const CreateEmployee = (props: any) => {

    return (
        <Box
            sx={{
                padding: 1,
                paddingTop: 3,
                maxWidth: { xs: '100%', sm: '600px', md: '800px' }, // Adjust width based on screen size
                margin: 'auto',
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
                Crear Empleado
            </Typography>

            {/* Set title prop to null to prevent default title generation */}
            <Create {...props} resource="employee" title={" "} redirect={'/admin/employees'} >
                <SimpleForm  // Handles the submit event and redirects
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
                        source="name"
                        label="Nombre"
                        fullWidth
                        required
                        resettable
                        inputProps={{
                            style: { marginTop: '10px' },
                        }}
                    />

                    {/* Last Name */}
                    <TextInput
                        source="surname"
                        label="Apellido"
                        fullWidth
                        required
                        resettable
                        inputProps={{
                            style: { marginTop: '10px' },
                        }}
                    />

                    {/* Phone */}
                    <TextInput
                        source="phone"
                        label="Teléfono"
                        fullWidth
                        type="tel"
                        resettable
                        inputProps={{
                            style: { marginTop: '10px' },
                        }}
                    />

                    {/* Email */}
                    <TextInput
                        source="email"
                        label="Correo"
                        fullWidth
                        required
                        type="email"
                        resettable
                        inputProps={{
                            style: { marginTop: '10px' },
                        }}
                    />


                    {/*Password */}
                    <TextInput
                        source="password"
                        label="Contraseña"
                        resettable
                        fullWidth
                        multiline
                        type="password"
                        inputProps={{
                            style: { marginTop: '10px' },
                        }}
                    />

                    {/* Rol */}
                    <SelectInput
                        source="rol"
                        label="Rol"
                        choices={[
                            { id: 'Admin', name: 'Admin' },
                            { id: 'Usuario', name: 'Usuario' }
                        ]}
                        emptyText=""
                        fullWidth
                        required
                        inputProps={{ style: { marginTop: '10px' } }}
                    />
                </SimpleForm>
            </Create>
        </Box >
    );
};

export default CreateEmployee;
