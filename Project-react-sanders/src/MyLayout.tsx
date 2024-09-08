// in src/MyLayout.js
import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const MyLogoutButton = forwardRef((props: any, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem onClick={handleClick} ref={ref}
        // It's important to pass the props to allow Material UI to manage the keyboard navigation
        {...props}>
            <ExitIcon /> Logout
        </MenuItem>
    );
});

const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

const MyLayout = ({ children }: any) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);

export default MyLayout;