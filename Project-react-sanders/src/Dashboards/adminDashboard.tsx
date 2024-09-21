// Admin Dashboard
import * as React from 'react';
import { Resource } from "react-admin"; // Elimina Admin de aquí
import { UserList } from '../Pages/users';
import { DonationList, SANDERSDonationCreate } from '../Pages/donaciones';
import { StatsList } from '../Pages/estadisticas';
import { EmployeeList, EmployeeCreate } from '../Pages/empleados';

import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from '../Components/icons';

const AdminDashboard = () => {
    return (
        <>
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
        </>
    );
};

export default AdminDashboard;
