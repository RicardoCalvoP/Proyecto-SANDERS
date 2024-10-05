import { Loading } from "react-admin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authProvider from "../Providers/authProvider"; // Import authProvider to obtain the user role

const Dashboard = () => {
    const [userRole, setUserRole] = useState(""); // State to store the user role
    const [loading, setLoading] = useState(true); // State to manage loading while fetching the role
    const navigate = useNavigate();

    // Fetch the user role from authProvider
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await authProvider.getPermissions({});
                setUserRole(role);
                setLoading(false); // Once the role is fetched, stop loading
            } catch (error) {
                console.error("Error fetching user permissions:", error);
                setLoading(false); // In case of error, stop loading
            }
        };

        fetchRole(); // Fetch the role when the component is mounted
    }, []);

    // Handle navigation based on user role once loading is finished
    useEffect(() => {
        if (!loading) {
            if (userRole === "Admin") {
                navigate("/admin-dashboard"); // Redirect to the Admin dashboard
            } else if (userRole === "Usuario") {
                navigate("/donator"); // Redirect to the donation page for users
            } else {
                navigate("/login"); // If the role is unclear, redirect to login
            }
        }
    }, [loading, userRole, navigate]);

    // Show loading indicator while fetching the role
    if (loading) return <Loading />;

    return null; // Return null as the component is just for redirection
};

export default Dashboard;
