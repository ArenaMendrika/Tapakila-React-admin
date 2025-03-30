import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, SelectInput, Create } from 'react-admin';

export const UserList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Rôle" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" label="Nom" />
      <TextInput source="email" label="Email" />
      <SelectInput source="role" label="Rôle" choices={[
        { id: 'ADMIN', name: 'Admin' },
        { id: 'USER', name: 'User' },
      ]} />
    </SimpleForm>
  </Create>
);

export const UserEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" label="Nom" />
      <TextInput source="email" label="Email" />
      <SelectInput source="role" label="Rôle" choices={[
        { id: 'ADMIN', name: 'Admin' },
        { id: 'USER', name: 'User' },
      ]} />
    </SimpleForm>
  </Edit>
);
