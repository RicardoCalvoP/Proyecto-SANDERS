import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';

// Import Dashboards
import Dashboard from "./Dashboards/dashboard";
import DashboardAdmin from "./Dashboards/adminDashboard";
import DashboardUser from "./Dashboards/userDashboards";

// Import Pages
import DonationsPage from "./Pages/AdminPages/donationsPage"
import CreateDonationPage from "./Pages/AdminPages/createDonationPage"
import UsersPage from "./Pages/AdminPages/usersPage"
import EmployeesPage from "./Pages/AdminPages/employeePage"
import CreateEmployee from "./Pages/AdminPages/createEmployeePage"
import ThankYouPage from "./Pages/UserPages/thankYouPage";

// Providers
const dataProvider = jsonServerProvider('https://localhost:5001');
import authProvider from "./Providers/authProvider";

export const App = () => {

  return (
    <Admin
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      layout={MyLayout}
      dashboard={Dashboard}
      loginPage={LoginPage}

    >
      <CustomRoutes>
        // Admin pages
        <Route path="/admin" element={<DashboardAdmin />} /> // Main admin page
        <Route path="/admin/donations" element={<DonationsPage />} /> // List of Donations
        <Route path="/admin/create/donations" element={<CreateDonationPage />} /> // Create Donations
        <Route path="/admin/users" element={<UsersPage />} /> // List of Users
        <Route path="/admin/employees" element={<EmployeesPage />} /> // List of Employees
        <Route path="/admin/create/employee" element={<CreateEmployee />} /> // List of Employees

        // User pages
        <Route path="/donator" element={<DashboardUser />} /> // Main user pages, donation forms
        <Route path="/thank-you" element={<ThankYouPage />} /> // Side page with a small thank message
      </CustomRoutes>


    </Admin>
  );
};

export default App;
