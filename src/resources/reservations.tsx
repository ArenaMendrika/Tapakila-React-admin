import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DeleteButton, DateField } from 'react-admin';

export const ReservationList: React.FC = () => (
  <List>
    <Datagrid>
      <ReferenceField source="user.id" reference="users" label="Utilisateur">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField source="event.id" reference="events" label="Événement">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="ticket.id" reference="tickets" label="Ticket">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="quantity" label="Quantité" />
      <DateField source="reservationDate" label="Date de réservation" />
      <BooleanField source="canceled" label="Annulée ?" />
    </Datagrid>
  </List>
);