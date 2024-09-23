// MyResources.tsx
import React from 'react';
import { Resource, usePermissions } from 'react-admin';
import { DonationList, OnlineDonationCreate, SANDERSDonationCreate } from "./donaciones";
import { UserList } from './users';
import { EmployeeList, EmployeeCreate } from './empleados';
import { PeopleIcon, PaidOutlinedIcon, BadgeOutlinedIcon } from '../Components/icons';

const Resources = () => {
    const { permissions } = usePermissions();

    return (
        <>
            {permissions === "admin" && (
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
                        icon={BadgeOutlinedIcon}
                    />
                </>
            )}

            <Resource
                name="donaciones"
                list={DonationList}
                create={permissions === "admin" ? SANDERSDonationCreate : OnlineDonationCreate}
                icon={PaidOutlinedIcon}
            />
        </>
    );
};

export default Resources;