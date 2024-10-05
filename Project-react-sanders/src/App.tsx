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
import ThankYouPage from "./Pages/thankYouPage";

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
        <Route path="/admin-dashboard" element={<DashboardAdmin />} />
        <Route path="/donator" element={<DashboardUser />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </CustomRoutes>


    </Admin>
  );
};

export default App;
