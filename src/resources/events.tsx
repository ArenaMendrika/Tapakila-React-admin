import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit } from 'react-admin';

export const EventList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="eventId" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EventCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" />
    </SimpleForm>
  </Create>
);

export const EventEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" />
    </SimpleForm>
  </Edit>
);