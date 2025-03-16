import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

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
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);