import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

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

export const UserEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" label="Nom" />
      <TextInput source="email" label="Email" />
      <SelectInput source="role" label="Rôle" choices={[
        { id: 'admin', name: 'Admin' },
        { id: 'user', name: 'User' },
      ]} />
    </SimpleForm>
  </Edit>
);
