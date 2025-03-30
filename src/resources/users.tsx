import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, SelectInput, Create } from 'react-admin';

export const UserList: React.FC = () => (
  <List resource="users" sx={{ marginTop: '22px' }}>
    <Datagrid 
      rowClick="show" 
      sx={{
        '& .MuiTableRow-root': {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          borderBottom: '2px solid #ddd',
        },
        '& .MuiTableCell-root': {
          padding: '12px 16px',
          backgroundColor: '#f9f9f9',
          border: 'none',
          textAlign: 'center',
        },
        '& .MuiTableHead-root': {
          backgroundColor: '#fafafa',
        },
        '& .MuiTableCell-head': {
          fontSize: '1.4rem',
          fontWeight: 'bold',
          fontFamily: '"Dancing Script", cursive',
        },
      }}
    >
      <TextField source="username" label="Nom" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <EmailField source="email" label="Email" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="role" label="Rôle" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
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
