import React from 'react';
import { List, Datagrid, TextField, DeleteButton } from 'react-admin';

export const ReservationList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="user" label="Utilisateur" />
      <TextField source="event" label="Événement" />
      <DeleteButton />
    </Datagrid>
  </List>
);
