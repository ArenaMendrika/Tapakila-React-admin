import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit, NumberInput } from 'react-admin';

export const TicketList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" label="Nom du Billet" />
      <TextField source="price" label="Prix (€)" />
      <TextField source="availability" label="Disponibilité" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const TicketCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom du Billet" />
      <NumberInput source="price" label="Prix (€)" />
      <NumberInput source="availability" label="Disponibilité" />
    </SimpleForm>
  </Create>
);

export const TicketEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom du Billet" />
      <NumberInput source="price" label="Prix (€)" />
      <NumberInput source="availability" label="Disponibilité" />
    </SimpleForm>
  </Edit>
);
