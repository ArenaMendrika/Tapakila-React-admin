import React from 'react';
import { List, Datagrid, TextField, ReferenceField, BooleanField, DeleteButton, DateField } from 'react-admin';

export const ReservationList: React.FC = () => (
  <List sx={{ marginTop: '40px' }}>
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
      <ReferenceField source="user.id" reference="users" label="Utilisateur">
        <TextField source="username" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      </ReferenceField>
      <ReferenceField source="event.id" reference="events" label="Événement">
        <TextField source="title" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      </ReferenceField>
      <ReferenceField source="ticket.id" reference="tickets" label="Ticket">
        <TextField source="name" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      </ReferenceField>
      <TextField source="quantity" label="Quantité" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <DateField source="reservationDate" label="Date de réservation" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <BooleanField source="canceled" label="Annulée ?" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
    </Datagrid>
  </List>
);