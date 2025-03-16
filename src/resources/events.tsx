import React from 'react';
import { Accept } from 'react-dropzone';
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, SimpleForm, TextInput, Edit, NumberField, BooleanField, ArrayField, FileField, FileInput, ImageField, SelectInput, DateTimeInput, NumberInput, BooleanInput, ImageInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const EventList: React.FC = () => (
  <List>
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

const acceptFormats: Accept = {
  'image/*': [],
};

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" required />
      <TextInput source="description" label="Description" multiline />
      <SelectInput
        source="category"
        label="Catégorie"
        choices={[
          { id: 'CONCERT', name: 'Concert' },
          { id: 'CONFERENCE', name: 'Conférence' },
          { id: 'SPORT', name: 'Sport' },
        ]}
      />
      <DateTimeInput source="startDateTime" label="Date et heure de début" />
      <TextInput source="location" label="Lieu" />
      <TextInput source="organizer" label="Organisateur" />
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'PUBLISHED', name: 'Publié' },
          { id: 'CANCELED', name: 'Annulé' },
          { id: 'DRAFT', name: 'Brouillon' },
        ]}
      />
      <ArrayInput source="tickets" label="Billets">
        <SimpleFormIterator>
          <TextInput source="name" label="Type" />
          <NumberInput source="price" label="Prix (€)" />
          <NumberInput source="quantityAvailable" label="Quantité Disponible" />
          <NumberInput source="purchaseLimitPerUser" label="Limite Achat" />
          <BooleanInput source="saleEnabled" label="Vente Active" />
        </SimpleFormIterator>
      </ArrayInput>

      <FileInput source="file" label="Image" accept={acceptFormats}>
        <FileField source="src" title="title" />
      </FileInput>

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