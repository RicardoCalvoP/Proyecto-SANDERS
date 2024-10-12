import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, useGetIdentity, Sidebar } from 'react-admin';
import { useLocation, Link } from 'react-router-dom';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { Typography, MenuItem, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from './Components/icons';

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

// Side Bar (Customizing styles)
const MySidebar = () => {
    const location = useLocation(); // To detect the current route

    // Helper function to determine if a route is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <Sidebar sx={{
            width: '250px',
            position: 'fixed',
            top: 50,
            left: 0,
            height: '88vh',
            borderRadius: '25px',
            margin: '15px',
            padding: '15px',
            backgroundColor: '#00304E',

        }}>
            <List>
                {/* Sidebar Items */}
                <Box sx={{ marginBottom: '5px', padding: '10px' }}>
                    {/* Dashboard */}
                    <ListItem
                        component={Link}
                        to="/admin"
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: isActive('/admin') ? '0px 4px 12px rgba(0, 0, 0, 1)' : 'none',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: 'gray',
                                boxShadow: '0px 15px 12px rgba(0, 0, 0, 0.3)',
                            },
                            color: 'white',
                            '& .MuiListItemText-root': {
                                color: 'white',
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </Box>

                <Box sx={{ marginBottom: '5px', padding: '10px' }}>
                    {/* Donations */}
                    <ListItem
                        component={Link}
                        to="/admin/donations"
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: isActive('/admin/donations') ? '0px 4px 12px rgba(0, 0, 0, 1)' : 'none',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: 'gray',
                                boxShadow: '0px 15px 12px rgba(0, 0, 0, 0.3)',
                            },
                            color: 'white',
                            '& .MuiListItemText-root': {
                                color: 'white',
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <PaidOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Donaciones" />
                    </ListItem>
                </Box>

                <Box sx={{ marginBottom: '5px', padding: '10px' }}>
                    {/* Users */}
                    <ListItem
                        component={Link}
                        to="/admin/users"
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: isActive('/admin/users') ? '0px 4px 12px rgba(0, 0, 0, 1)' : 'none',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: 'gray',
                                boxShadow: '0px 15px 12px rgba(0, 0, 0, 0.3)',
                            },
                            color: 'white',
                            '& .MuiListItemText-root': {
                                color: 'white',
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                </Box>

                <Box sx={{ marginBottom: '5px', padding: '10px' }}>
                    {/* Employees */}
                    <ListItem
                        component={Link}
                        to="/admin/employees"
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: isActive('/admin/employees') ? '0px 4px 12px rgba(0, 0, 0, 1)' : 'none',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: 'gray',
                                boxShadow: '0px 15px 12px rgba(0, 0, 0, 0.3)',
                            },
                            color: 'white',
                            '& .MuiListItemText-root': {
                                color: 'white',
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <BadgeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empleados" />
                    </ListItem>
                </Box>

            </List>
        </Sidebar>
    );
};

// Custom User Menu to show email and logout
const MyUserMenu = () => {
    const { identity, isLoading } = useGetIdentity();

    return (
        <UserMenu >
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
    <AppBar userMenu={<MyUserMenu />} sx={{
        background: '#00304E'
    }} />
);

// Layout with dynamic sidebar based on the current path or user role
const MyLayout = ({ children }: any) => {
    const location = useLocation();
    const identity = JSON.parse(localStorage.getItem('identity') || '{}');
    const userRol = identity.rol;

    // Conditionally hide sidebar and appbar for "Usuario" role
    const hideSidebarAndAppBar = userRol === 'Usuario';

    return (
        <Layout
            // appBar={hideSidebarAndAppBar ? () => null : MyAppBar} // Hide AppBar if the user role is "Usuario"
            appBar={MyAppBar}
            sidebar={hideSidebarAndAppBar ? () => null : MySidebar} // Hide Sidebar if the user role is "Usuario"
            sx={{
                paddingLeft: hideSidebarAndAppBar ? '0px' : '300px', // Adjust layout padding based on sidebar visibility
                paddingTop: hideSidebarAndAppBar ? '0px' : '80px', // Adjust padding for the app bar
            }}
        >
            {children}
        </Layout>
    );
};


export default MyLayout;