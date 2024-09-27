import { useMediaQuery, Theme } from "@mui/material";
import { create } from "domain";
import {
    List, Datagrid, TextField, DateField, NumberField, EmailField,
    SimpleForm, TextInput, NumberInput,
    Create, SelectInput,
    Filter
} from "react-admin";

// Filter for Donations
const DonationFilter = (props: any) => (
    <Filter {...props}>
        {/* TextInput filter by name */}
        <TextInput label="Nombre" source="donator_name" alwaysOn />

        {/* TextInput filter by surname */}
        <TextInput label="Apellido" source="donator_surname" alwaysOn />

        {/* TextInput filter by mail */}
        <TextInput label="Correo" source="donator_email" alwaysOn />

        {/* SelectInput filter by donation type */}
        <SelectInput
            label="Tipo"
            source="kind"
            choices={[
                { id: 'En linea', name: 'En línea' },
                { id: 'Tarjeta', name: 'Tarjeta' },
                { id: 'Efectivo', name: 'Efectivo' },
                { id: 'Transferencia', name: 'Transferencia' }
            ]}
            alwaysOn
            emptyText="Ninguno filtro"  // Text for the empty option
            parse={(value) => value === '' ? null : value} // Parse empty string to null
        />
    </Filter>
);

export const DonationList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"));

    return (

        <List filters={<DonationFilter />}>
            <Datagrid>
                <TextField source="id" sortable={false} />
                <TextField source="donator_name" label="Nombre" sortable={true} />
                <TextField source="donator_surname" label="Apellido" sortable={true} />
                <EmailField source="donator_email" label="Email" sortable={false} />
                <TextField source="donator_phone" label="Telefono" sortable={false} />
                <TextField source="comment" label="Comentario" sortable={false} />
                <NumberField source="amount" label="Monto" sortable={true} />
                <TextField source="kind" label="Tipo" />
                <DateField source="date" label="Fecha" sortable={true} />
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
                {/* Rol field with SelectInput instead of TextInput */}
                <SelectInput
                    source="kind"
                    label="Tipo de Donación"
                    choices={[
                        { id: 'Efectivo', name: 'Efectivo' },
                        { id: 'Tarjeta', name: 'Tarjeta' },
                        { id: 'Trasnferencia', name: 'Trasnferencia' }
                    ]}
                />
            </SimpleForm>
        </Create>

    )
}
