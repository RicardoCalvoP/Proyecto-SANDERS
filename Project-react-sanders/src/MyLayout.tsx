import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Title, Layout, UserMenu, useLogout, useGetIdentity, Sidebar } from 'react-admin';
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

    // Verifica si se está cargando la identidad o si no hay identidad
    if (isLoading || !identity) {
        return null; // Si está cargando o no hay identidad, no mostrar nada
    }


    const { email, rol } = identity; // E   xtrae el email y el rol del objeto identity

    return (
        <UserMenu>
            {/* Muestra el correo solo si el rol es 'Admin' */}
            {rol === "Admin" && (
                <MenuItem disabled>
                    <Typography variant="body1">
                        {email} {/* Muestra el correo solo si el rol es 'Admin' */}
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
    <AppBar position='fixed'
        sx={{
            background: '#00304E',
            justifyContent: 'space-between',
            display: 'flex',
            zIndex: 1200

        }}
        userMenu={<MyUserMenu />} // Menú de usuario personalizado, si lo tienes
    >
        <Box sx={{ flex: 1 }}>
            {/* Renderiza el título dinámico de cada página */}
            <Title />
        </Box>
    </AppBar>
);


const MyLayout = ({ children }: any) => {
    const location = useLocation();
    const { identity, isLoading } = useGetIdentity();

    // Ensure identity is loaded
    if (isLoading || !identity) {
        return null; // Could show a loading spinner or fallback here
    }

    const { rol } = identity;
    // Conditionally hide sidebar and appbar for "Usuario" role
    const hideSidebarAndAppBar = rol === 'Usuario';
    return (
        <Layout
            appBar={MyAppBar} // Conditionally hide AppBar
            sidebar={hideSidebarAndAppBar ? () => null : MySidebar} // Conditionally hide Sidebar
            sx={{
                paddingLeft: hideSidebarAndAppBar ? '0px' : '300px', // Adjust padding based on sidebar visibility
                paddingTop: hideSidebarAndAppBar ? '0px' : '80px'   // Adjust padding based on app bar visibility
            }}
        >
            {children}
        </Layout>
    );
};


export default MyLayout;