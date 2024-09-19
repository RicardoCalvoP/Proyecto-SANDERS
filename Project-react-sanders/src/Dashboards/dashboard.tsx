import { usePermissions, Loading } from "react-admin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { isLoading } = usePermissions();
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/admin-dashboard/*');
    }, [isLoading, navigate]
    );

    if (isLoading) return <Loading />;
    return null;
};

export default Dashboard;