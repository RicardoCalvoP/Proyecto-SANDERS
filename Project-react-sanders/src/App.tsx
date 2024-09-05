import React from "react";
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
// import { dataProvider } from "./dataProvider";

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



export const App = () => (
  <Admin
  //layout={Layout} dataProvider={dataProvider}
  >
    <Resource
      name="users"
      list={UserList} create={UsersCreate}
      icon={PeopleIcon} />

    <Resource
      name="donaciones"
      list={DonationList} create={DonationCreate}
      icon={PaidOutlinedIcon} />

    <Resource
      name="estadisticas"
      list={StatsList}
      icon={BarChartOutlinedIcon} />

    <Resource
      name="empleados"
      list={EmployeeList} create={EmployeeCreate}
      icon={BadgeOutlinedIcon} />
  </Admin>
);
