import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, ReferenceField, DateField,
    SimpleForm, TextInput, NumberInput, DateInput,
    Create
} from "react-admin";

import CIcon from '@coreui/icons-react';
import cisMoney from '@coreui/icons';

export const DonationList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

    return (

        <List>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source=" userId" reference="users" />
                <TextField source="programa" />
                <TextField source="monto" />
                <DateField source="fecha" />
            </Datagrid>
        </List>
    )
}

export const DonationCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="programa" />
                <NumberInput source="monto" />
                <TextInput source="email" />
                <DateInput source="fecha" />
            </SimpleForm>
        </Create>
    )
}