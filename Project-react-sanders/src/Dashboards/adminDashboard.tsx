// Admin Dashboard
import * as React from 'react';
import { Admin, Resource } from "react-admin";
import { UserList } from '../Components/users';
import { DonationList, SANDERSDonationCreate } from '../Components/donaciones';
import { StatsList } from '../Components/estadisticas';
import { EmployeeList, EmployeeCreate } from '../Components/empleados';

import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon, BarChartOutlinedIcon } from '../Components/icons'

const AdminDashboard = () => {

    return (
        <Admin>
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
        </Admin>
    )

};

export default AdminDashboard;