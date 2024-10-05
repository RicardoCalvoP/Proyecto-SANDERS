import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, useGetIdentity, Sidebar } from 'react-admin';
import { useLocation } from 'react-router-dom';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { Typography, MenuItem, Box } from '@mui/material';

// Custom Logout Button
const MyLogoutButton = forwardRef((props: any, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem onClick={handleClick} ref={ref}
            {...props}
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});

// Custom User Menu to show email and logout
const MyUserMenu = () => {
    // Get user identity, including email
    const { identity, isLoading } = useGetIdentity();

    return (
        <UserMenu>

            {/* If the identity is loaded, display the user's email */}
            {!isLoading && identity && (
                <MenuItem disabled>
                    <Typography variant="body1">
                        {identity.email}  {/* Assuming the email is in identity.email */}
                    </Typography>
                </MenuItem>
            )}

            <Box display="flex" justifyContent="center" width="100%">
                <MyLogoutButton />
            </Box>
        </UserMenu>
    );
};

// Custom AppBar with the User Menu
const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} sx={{ background: '#00304E' }} />;

// Layout with dynamic sidebar based on the current path or user role
const MyLayout = ({ children }: any) => {
    const location = useLocation(); // Detect the current route

    // Check if we are in the UserDashboard to hide the Sidebar
    const hideSidebar = location.pathname === '/donator' || location.pathname === '/thank-you'; // Routes where we want to hide the sidebar

    return (
        <Layout
            appBar={MyAppBar}
            sidebar={hideSidebar ? () => null : Sidebar} // Hide sidebar if we are in UserDashboard
        >
            {children}
        </Layout>
    );
};

export default MyLayout;
