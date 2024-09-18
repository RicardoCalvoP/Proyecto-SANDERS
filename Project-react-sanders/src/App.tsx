import React, { useState, useEffect } from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';

// Imported Icons
import PeopleIcon from '@mui/icons-material/People';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

// Imported Files
import { UserList, UsersCreate } from "./users";
import { DonationCreate, DonationList } from "./donaciones";
import { EmployeeCreate, EmployeeList } from "./empleados";
import { StatsList } from "./estadisticas";
import LoginPage from "./loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./i18nProvider";

// Data Provider
const dataProvider = jsonServerProvider('http://localhost:5001');

export const App = () => (
  <Admin
    loginPage={LoginPage}
    layout={MyLayout}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="usuarios"
      list={UserList}
      create={UsersCreate}
      icon={PeopleIcon}
    />
    <Resource
      name="donaciones"
      list={DonationList}
      create={DonationCreate}
      icon={PaidOutlinedIcon}
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
  </Admin>
);


export default App;
