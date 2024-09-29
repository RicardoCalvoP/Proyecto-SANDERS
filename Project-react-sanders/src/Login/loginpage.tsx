import { useState } from "react"; // Import React hooks for state management
import { useLogin, useNotify } from 'react-admin'; // Import React Admin's login function and notification system
import { Box, Button, TextField, CircularProgress, Typography, IconButton, InputAdornment, Alert } from '@mui/material'; // Import Material UI components for styling
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons to toggle password visibility

// Import background image
import backgroundImage from './Images/Image4.jpg'; // Local image route

const LoginPage = () => {
    const [loading, setLoading] = useState(false); // Tracks if the login process is ongoing
    const [email, setEmail] = useState(''); // Stores the email input value
    const [password, setPassword] = useState(''); // Stores the password input value
    const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
    const [error, setError] = useState(''); // Tracks any login errors
    const login = useLogin(); // React Admin's login function to authenticate users
    const notify = useNotify(); // React Admin's notification system for alerts

    // Function triggered when the login form is submitted
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Set loading state to true to show progress indicator
        setError(''); // Clear any previous error messages

        // Check if both email and password are provided
        if (!email || !password) {
            setError('Correo y contraseña son obligatorios.'); // Show error if fields are empty
            setLoading(false); // Stop loading indicator
            return; // Exit the function if validation fails
        }

        try {
            // Attempt to log in with the provided email and password
            await login({ email, password });

            // Get name from localStorage (assuming you store it in authProvider)
            const identity = JSON.parse(localStorage.getItem('identity') || '{}');
            const userName = identity.name;

            // Show welcome notification with user's name
            notify(`¡Te damos la bienvenida, ${userName}!`, { type: 'success' }); // Success notification

        } catch (error) {
            // If login fails, set an error message
            setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
            notify('Error al iniciar sesión. Por favor, revisa tus credenciales.', { type: 'warning' }); // Notify user about login failure
        }

        setLoading(false); // Stop loading indicator after login attempt
    };

    return (
        <Box
            sx={{
                display: 'flex', // Flexbox layout for centering
                justifyContent: 'flex-end', // Align content to the right
                alignItems: 'center', // Center content vertically
                height: '100vh', // Full height of the viewport
                backgroundImage: `url(${backgroundImage})`, // Apply background image
                backgroundSize: 'cover', // Make sure the image covers the entire screen
                backgroundRepeat: 'no-repeat', // Ensure the image does not repeat
                backgroundPosition: 'center', // Center the background image
                padding: 2, // Add padding to ensure spacing
            }}
        >
            <Box
                component="form" // This is the form container
                onSubmit={handleSubmit} // Calls handleSubmit when the form is submitted
                sx={{
                    backgroundColor: '#ffffff', // Set the form background to white
                    padding: '2rem', // Add padding inside the form
                    borderRadius: '8px', // Apply rounded corners to the form
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a light shadow around the form
                    height: '100%', // Occupy full height of the container
                    width: '30%', // Form occupies 30% of the screen width
                    display: 'flex', // Flexbox layout for form elements
                    flexDirection: 'column', // Arrange elements vertically
                    alignItems: 'center', // Center elements horizontally
                    justifyContent: 'center', // Center elements vertically within the form
                    gap: 2, // Add space between form elements
                }}
            >

                <Typography variant="h4" component="h1" sx={{ color: '#333', marginBottom: '1.5rem' }}>
                    Iniciar Sesión
                </Typography>

                {/* Email input field */}
                <Box sx={{ width: '100%', border: '2px solid #808080', borderRadius: '8px', padding: '0.5rem' }}>
                    <TextField
                        label="Correo electrónico" // Email input label
                        type="email" // Specifies email input type
                        value={email} // Controlled component: binds value to email state
                        onChange={(e) => setEmail(e.target.value)} // Updates email state on user input
                        fullWidth // Input takes up full width of the container
                        required // Marks the field as required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000000', // Black border for input
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000000', // Black border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000000', // Black border when focused
                                },
                            },
                        }}
                        InputProps={{
                            style: { color: '#000000' }, // Set input text color to black
                        }}
                        inputProps={{
                            style: { color: '#000000' }, // Set user input text color to black
                        }}
                        FormHelperTextProps={{
                            sx: { color: '#000000' }, // Set helper text color (e.g., error messages)
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#000000', // Set placeholder (label inside input) color to black
                            },
                        }}
                        error={!!error} // Displays red border if there's an error
                        aria-label="Campo para el correo electrónico" // Accessibility label for screen readers
                        aria-required="true" // Informs screen readers that the field is required
                        aria-invalid={!!error} // Informs screen readers if the field has an error
                    />
                </Box>

                {/* Password input field with visibility toggle */}
                <Box sx={{ width: '100%', border: '2px solid #808080', borderRadius: '8px', padding: '0.5rem' }}>
                    <TextField
                        label="Contraseña" // Password input label
                        type={showPassword ? 'text' : 'password'} // Toggles between password visibility and hidden text
                        value={password} // Controlled component: binds value to password state
                        onChange={(e) => setPassword(e.target.value)} // Updates password state on user input
                        fullWidth // Input takes up full width of the container
                        required // Marks the field as required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000000', // Black border for input
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000000', // Black border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000000', // Black border when focused
                                },
                            },
                        }}
                        InputProps={{
                            style: { color: '#000000' }, // Set input text color to black
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Alternar visibilidad de la contraseña" // Accessible label for screen readers
                                        onClick={() => setShowPassword(!showPassword)} // Toggles password visibility
                                        edge="end" // Positions the icon at the end of the input field
                                        sx={{ color: '#808080' }} // Sets the color of the icon to gray
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggles between visibility icons */}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            style: { color: '#000000' }, // Set user input text color to black
                        }}
                        FormHelperTextProps={{
                            sx: { color: '#000000' }, // Set helper text color (e.g., error messages)
                        }}
                        InputLabelProps={{
                            sx: {
                                color: '#000000', // Set placeholder (label inside input) color to black
                            },
                        }}
                        error={!!error} // Displays red border if there's an error
                        aria-label="Campo para la contraseña" // Accessibility label for screen readers
                        aria-required="true" // Informs screen readers that the field is required
                        aria-invalid={!!error} // Informs screen readers if the field has an error
                    />
                </Box>

                {/* Displays an error message if there is one */}
                {error && (
                    <Alert severity="error" sx={{ width: '100%' }} aria-live="assertive">
                        {error} {/* Error message displayed to the user */}
                    </Alert>
                )}

                {/* Submit button */}
                <Button
                    type="submit" // Defines the button as the form's submit button
                    variant="contained" // Material UI's contained button style
                    color="primary" // Primary color (usually blue)
                    disabled={loading} // Disables the button when loading
                    fullWidth // Button takes up full width of the container
                    sx={{ padding: 1.5, marginTop: '1rem', backgroundColor: '#005f73', color: 'white' }} // Darker blue button with white text
                    aria-label="Enviar formulario de inicio de sesión" // Accessible label for screen readers
                >
                    {/* Shows a loading spinner while logging in */}
                    {loading ? <CircularProgress size={24} /> : 'Continuar'}
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
