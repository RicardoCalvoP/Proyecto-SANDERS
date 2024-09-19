import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, DateField, NumberField, EmailField,
    SimpleForm, TextInput, NumberInput,
    Create
} from "react-admin";

export const DonationList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"));

    return (

        <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="donator_name" label="Nombre" />
                <TextField source="donator_surname" label="Apellido" />
                <EmailField source="donator_email" label="Email" />
                <TextField source="donator_phone" label="Telefono" />
                <TextField source="comment" label="Comentario" />
                <NumberField source="amount" label="Monto" />
                <TextField source="kind" label="Tipo" />
                <DateField source="date" label="Fecha" />
            </Datagrid>

        </List>
    )
}

export const OnlineDonationCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm
            >
                <TextInput source="donator_name" label="Nombre" />
                <TextInput source="donator_surname" label="Apellido" />
                <TextInput source="donator_email" label="Email" />
                <TextInput source="donator_phone" label="Telefono" />
                <TextInput source="comment" label="Comentario" />
                <NumberInput source="amount" label="Monto" />

            </SimpleForm>
        </Create>
    )
}

export const SANDERSDonationCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm
            >
                <TextInput source="donator_name" label="Nombre" />
                <TextInput source="donator_surname" label="Apellido" />
                <TextInput source="donator_email" label="Email" />
                <TextInput source="donator_phone" label="Telefono" />
                <TextInput source="comment" label="Comentario" />
                <NumberInput source="amount" label="Monto" />
                <TextInput source="kind" label="Forma de Pago" />

            </SimpleForm>
        </Create>

    )
}