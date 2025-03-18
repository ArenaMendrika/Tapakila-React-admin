import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, ArrayInput, ArrayField, NumberField, ImageField, BooleanField } from 'react-admin';

export const DraftEventList: React.FC = () => (
  <List resource="events/draft" filter={{ status: 'DRAFT' }}>
    <Datagrid>
      <TextField source="category" label="Catégorie" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="startDateTime" label="Date & Heure" />
      <TextField source="location" label="Lieu" />
      <TextField source="organizer" label="Organisateur" />
      <TextField source="status" label="Statut" />

      <ArrayField source="tickets" label="Billets">
              <Datagrid>
                <TextField source="name" label="Type" />
                <NumberField source="price" label="Prix (€)" />
                <NumberField source="quantityAvailable" label="Quantité" />
                <NumberField source="purchaseLimitPerUser" label="Limite Achat" />
                <BooleanField source="saleEnabled" label="Vente Active" />
              </Datagrid>
            </ArrayField>
      
            <ImageField source="imageUrl" label="Image" />
      
            <EditButton />
            <DeleteButton />
    </Datagrid>
  </List>
);