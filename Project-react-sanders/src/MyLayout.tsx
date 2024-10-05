import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, useGetIdentity, Sidebar } from 'react-admin';
import { useLocation, Link } from 'react-router-dom';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { Typography, MenuItem, Box } from '@mui/material';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from './Components/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

// Custom Logout Button
const MyLogoutButton = forwardRef((props: any, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem onClick={handleClick} ref={ref} {...props}>
            <ExitIcon /> Logout
        </MenuItem>
    );
});

// Side Bar
const MySidebar = () => (
    <Sidebar>
        <List>
            {/* Redirigir a la página de estadísticas/resumen */}
            <ListItem button component={Link} to="/admin">
                <ListItemIcon>
                    <BarChartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Redirigir a la tabla de donaciones */}
            <ListItem button component={Link} to="/admin/donations">
                <ListItemIcon>
                    <PaidOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Donations" />
            </ListItem>

            {/* Redirigir a la tabla de usuarios */}
            <ListItem button component={Link} to="/admin/users">
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>

            {/* Redirigir a la tabla de empleados */}
            <ListItem button component={Link} to="/admin/employees">
                <ListItemIcon>
                    <BadgeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Employees" />
            </ListItem>
        </List>
    </Sidebar>
);

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
                        {identity.email} {/* Assuming the email is in identity.email */}
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
const MyAppBar = () => (
    <AppBar userMenu={<MyUserMenu />} sx={{ background: '#00304E' }} /> // Custom background color
);

// Layout with dynamic sidebar based on the current path or user role
const MyLayout = ({ children }: any) => {
    const location = useLocation(); // Detect the current route

    // Check if we are in the UserDashboard to hide the Sidebar
    const hideSidebar = location.pathname === '/donator' || location.pathname === '/thank-you'; // Routes where we want to hide the sidebar

    return (
        <Layout
            appBar={MyAppBar} // Use custom AppBar
            sidebar={hideSidebar ? () => null : MySidebar} // Use custom Sidebar and hide in certain routes
        >
            {children}
        </Layout>
    );
};

export default MyLayout;
