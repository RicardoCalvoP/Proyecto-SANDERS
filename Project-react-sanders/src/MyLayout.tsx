import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, useGetIdentity } from 'react-admin';
import Avatar from '@mui/material/Avatar';
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
const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

// Layout with custom AppBar
const MyLayout = ({ children }: any) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);

export default MyLayout;
