import React, { useState } from "react";
import { Admin, Resource } from "react-admin";

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';
import { DonationList, OnlineDonationCreate, SANDERSDonationCreate } from "./Pages/donaciones";
import { UserList } from './Pages/users';
// import { StatsList } from './Pages/estadisticas';  // Import when finish 
import { EmployeeList, EmployeeCreate } from './Pages/empleados';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from './Components/icons';

// Providers
const dataProvider = jsonServerProvider('http://localhost:5001');
import authProvider from "./Providers/authProvider";

export const App = () => {
  // Cambia el valor aquí para simular diferentes roles
  const [userRole] = useState("admin"); // Cambia a "user" para ver el comportamiento del usuario regular

  return (
    <Admin
      loginPage={LoginPage}
      layout={MyLayout}
      authProvider={authProvider}
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
          {/*
          <Resource
            name="estadisticas"
            list={StatsList}
            icon={BarChartOutlinedIcon}
          />
       */}

          <Resource
            name="empleados"
            list={EmployeeList}
            create={EmployeeCreate}
            icon={BadgeOutlinedIcon}
          />
        </>


      )
      }

      <Resource

        name="donaciones"
        list={DonationList}
        // If admin then create with SANDERS form 
        // Else create with OnlineDonation as user
        // (different inputs)
        create={userRole === "admin" ? SANDERSDonationCreate : OnlineDonationCreate}
        icon={PaidOutlinedIcon}
      />


    </Admin >
  );
};

export default App;
