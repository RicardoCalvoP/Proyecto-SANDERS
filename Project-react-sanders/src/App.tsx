import * as React from "react";
import { Layout } from "./Layout";
import LoginPage from "./loginpage";
import MyLayout from "./MyLayout";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
const dataProvider = jsonServerProvider('http://localhost:5001');

// Imported Icons
import PeopleIcon from '@mui/icons-material/People';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

// Imported Files
import { UserList, UsersCreate } from "./users";
import { DonationCreate, DonationList } from "./donaciones";
import { EmployeeCreate, EmployeeList } from "./empleados";

// Extra libraries 
import CIcon from '@coreui/icons-react';
import { StatsList } from "./estadisticas";
import { json } from "stream/consumers";



export const App = () => (
  <Admin
    loginPage={LoginPage} layout={MyLayout} dataProvider={dataProvider}
  // layout={Layout}   
  >
    <Resource
      name="users"
      list={UserList}
      create={UsersCreate}
      icon={PeopleIcon} />

    <Resource
      name="donaciones"
      list={DonationList}
      create={DonationCreate}
      icon={PaidOutlinedIcon} />

    <Resource
      name="estadisticas"
      list={StatsList}
      icon={BarChartOutlinedIcon} />

    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      icon={BadgeOutlinedIcon} />
  </Admin>
);
