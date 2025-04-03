import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, ArrayField, NumberField, ImageField, BooleanField } from 'react-admin';

export const DraftEventList: React.FC = () => (
  <List resource="events/draft" filter={{ status: 'DRAFT' }} sx={{ marginTop: '22px' }}>
    <Datagrid
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
          fontSize: '1.2rem',
          fontWeight: 'bold',
          fontFamily: '"Dancing Script", cursive',
        },
      }}
    >
      <TextField source="category" label="Catégorie" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="title" label="Titre" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="description" label="Description" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="startDateTime" label="Date & Heure" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="location" label="Lieu" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="organizer" label="Organisateur" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
      <TextField source="status" label="Statut" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />

      <ArrayField source="tickets" label="Billets">
        <Datagrid
          sx={{
            '& .MuiTableRow-root': {
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.01)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              borderBottom: '1px solid #ddd',
            },
            '& .MuiTableCell-root': {
              padding: '10px',
              backgroundColor: '#fff',
              border: 'none',
            },
          }}
        >
          <TextField source="name" label="Type" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
          <NumberField source="price" label="Prix" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
          <NumberField source="quantityAvailable" label="Quantité" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
          <NumberField source="purchaseLimitPerUser" label="Limite Achat" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
          <BooleanField source="saleEnabled" label="Vente Active" sx={{ fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }} />
        </Datagrid>
      </ArrayField>

      <ImageField source="imageUrl" label="Image" sx={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }} />

      <EditButton resource="events" />
      <DeleteButton />
    </Datagrid>
  </List>
);
