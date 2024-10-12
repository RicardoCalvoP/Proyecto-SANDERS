import React from "react";
import { Navigate } from "react-router-dom";
import { usePermissions, useNotify } from "react-admin";
import { CircularProgress, Box } from "@mui/material"; // For loading spinner

const ProtectedRoute = ({ role, children }: { role: string, children: React.ReactNode }) => {
    const { permissions, isLoading } = usePermissions();

    // Show loading spinner while permissions are being loaded
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // If the user doesn't have the right permissions or role, redirect them
    if (!permissions || permissions !== role) {
        const notify = useNotify();
        notify('Acceso denegado.');
        return <Navigate to="/donator" replace />;
    }

    // Render the protected component if the user has the correct role
    return <>{children}</>;
};

export default ProtectedRoute;
