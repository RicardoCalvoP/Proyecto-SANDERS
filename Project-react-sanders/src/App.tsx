import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';

// Import Dashboards
import DashboardAdmin from "./Dashboards/adminDashboard";
import DashboardUser from "./Dashboards/userDashboards";
// Import ProtectedRoute component
import ProtectedRoute from "./Dashboards/protectedRoutes";

// Import Pages
import DonationsPage from "./Pages/AdminPages/donationsPage";
import CreateDonationPage from "./Pages/AdminPages/createDonationPage";
import UsersPage from "./Pages/AdminPages/usersPage";
import EmployeesPage from "./Pages/AdminPages/employeePage";
import CreateEmployee from "./Pages/AdminPages/createEmployeePage";
import ThankYouPage from "./Pages/UserPages/thankYouPage";

// Providers
import dataProvider from "./Providers/dataProvider";
import authProvider from "./Providers/authProvider";

export const App = () => (
  <Admin
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    layout={MyLayout}
    loginPage={LoginPage}
  >
    <CustomRoutes>
      // Users Routes
      <Route path="/donator" element={<DashboardUser />} /> // Users Donation Form
      <Route path="/thank-you" element={<ThankYouPage />} /> // Thank You Page After Donating

      // Admin Routes
      <Route path="/admin" element={<ProtectedRoute role="Admin"><DashboardAdmin /></ProtectedRoute>} /> // Main Admin Page
      <Route path="/admin/donations" element={<ProtectedRoute role="Admin"><DonationsPage /></ProtectedRoute>} /> // Admin Donations Table
      <Route path="/admin/create/donations" element={<ProtectedRoute role="Admin"><CreateDonationPage /></ProtectedRoute>} /> // Admin Create Donation Form
      <Route path="/admin/users" element={<ProtectedRoute role="Admin"><UsersPage /></ProtectedRoute>} /> // Admin Users Table
      <Route path="/admin/employees" element={<ProtectedRoute role="Admin"><EmployeesPage /></ProtectedRoute>} /> // Admin Employees Table
      <Route path="/admin/create/employee" element={<ProtectedRoute role="Admin"><CreateEmployee /></ProtectedRoute>} /> // Admin Create Employee Form

      <Route path="*" element={<DashboardUser />} />
    </CustomRoutes>
  </Admin >
);

export default App;
