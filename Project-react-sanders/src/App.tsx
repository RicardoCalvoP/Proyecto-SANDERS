import { useState, useEffect } from "react";
import { Admin, Resource } from "react-admin";

// Imported Files
import LoginPage from "./Login/loginpage";
import MyLayout from "./MyLayout";
import { i18nProvider } from "./Language/i18nProvider";
import jsonServerProvider from 'ra-data-json-server';
import { DonationList, OnlineDonationCreate, SANDERSDonationCreate } from "./Pages/donaciones";
import { UserList } from './Pages/users';
import { EmployeeList, EmployeeCreate, EmployeeEdit } from './Pages/empleados';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon } from './Components/icons';

// Providers
const dataProvider = jsonServerProvider('https://localhost:5001');
import authProvider from "./Providers/authProvider";

export const App = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => { authProvider.getPermissions({}).then(role => setUserRole(role)); }, []);

  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      layout={MyLayout}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
    >

      <Resource
        name="donaciones"
        list={DonationList}
        create={userRole === "admin" ? SANDERSDonationCreate : OnlineDonationCreate}
        icon={PaidOutlinedIcon}
      />
      {userRole === "admin" && (
        <>
          <Resource
            name="usuarios"
            list={UserList}
            icon={PeopleIcon}
          />
          <Resource
            name="empleados"
            list={EmployeeList}
            create={EmployeeCreate}
            edit={EmployeeEdit}
            icon={BadgeOutlinedIcon}
          />
        </>
      )}

    </Admin>
  );
};

export default App;
