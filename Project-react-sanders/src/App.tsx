import React, { useState, useEffect } from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';

// Imported Icons
import PeopleIcon from '@mui/icons-material/People';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

// Imported Files
import { UserList, UsersCreate } from "./Components/users";
import { DonationList, OnlineDonationCreate, SANDERSDonationCreate } from "./Components/donaciones";
import { EmployeeCreate, EmployeeList } from "./Components/empleados";
import { StatsList } from "./Components/estadisticas";
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import { on } from "events";

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
      // create={UsersCreate} user are created when donating
      icon={PeopleIcon}
    />
    <Resource
      name="donaciones"
      list={DonationList}
      create={OnlineDonationCreate} // Creation of donation for regular user 
      // when user is auth as employee SANDERSDonationCreate will be available
      // create={SANDERSDonationCreate} // Creation of donation for employees
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
