import React, { useState, useEffect } from "react";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from 'react-router-dom';

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';
import AdminDashboard from "./Dashboards/adminDashboard";
import { DonationList } from "./Components/donaciones";

import { UserList } from './Components/users';
import { SANDERSDonationCreate } from './Components/donaciones';
import { StatsList } from './Components/estadisticas';
import { EmployeeList, EmployeeCreate } from './Components/empleados';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from './Components/icons'
import Dashboard from "./Dashboards/dashboard";

// Data Provider
const dataProvider = jsonServerProvider('http://localhost:5001');

export const App = () => (
  <Admin
    loginPage={LoginPage}
    layout={MyLayout}
    dashboard={Dashboard}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}

  >
    {/*

    <Resource
      name="donaciones"
      list={DonationList}
      create={SANDERSDonationCreate} // Creation of donation for employees
      icon={PaidOutlinedIcon}
    />
    <Resource
      name="usuarios"
      list={UserList}
      // create={UsersCreate} user are created when donating
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
 */}

    <CustomRoutes>
      <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
    </CustomRoutes>

  </Admin >
);


export default App;
