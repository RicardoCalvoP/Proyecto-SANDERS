import React, { useState } from "react";
import { Admin, Resource } from "react-admin";
import { Route } from 'react-router-dom';

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';
import { DonationList, OnlineDonationCreate } from "./Pages/donaciones";
import { UserList } from './Pages/users';
import { SANDERSDonationCreate } from './Pages/donaciones';
import { StatsList } from './Pages/estadisticas';
import { EmployeeList, EmployeeCreate } from './Pages/empleados';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from './Components/icons';
import Dashboard from "./Dashboards/dashboard";

// Data Provider
const dataProvider = jsonServerProvider('http://localhost:5001');

export const App = () => {
  // Cambia el valor aquí para simular diferentes roles
  const [userRole] = useState("admin"); // Cambia a "user" para ver el comportamiento del usuario regular

  return (
    <Admin
      loginPage={LoginPage}
      layout={MyLayout}
      dashboard={Dashboard}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
    >
      {userRole === "admin" && (
        <>
          <Resource
            name="usuarios"
            list={UserList}
            icon={PeopleIcon}
          />
          <Resource
            name="estadisticas"
            list={StatsList}
            icon={BarChartOutlinedIcon}
          />
          <Resource
            name="empleados"
            list={EmployeeList}
            create={EmployeeCreate}
            icon={BadgeOutlinedIcon}
          />
        </>
      )}

      <Resource
        name="donaciones"
        list={DonationList}
        create={userRole === "admin" ? SANDERSDonationCreate : OnlineDonationCreate}
        icon={PaidOutlinedIcon}
      />

      {/* 
      Virtual Box Version
      <CustomRoutes>
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </CustomRoutes>
      */}
    </Admin>
  );
};

export default App;
