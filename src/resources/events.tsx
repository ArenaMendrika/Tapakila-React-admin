import React from 'react';
import { Accept } from 'react-dropzone';
import { useEffect, useRef } from 'react';
import { 
  SaveButton, 
  Toolbar, 
  useRedirect, 
  useNotify, 
  useDataProvider, 
  TopToolbar,
  CreateButton
} from "react-admin";
import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import DraftsIcon from "@mui/icons-material/Drafts";
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton, 
  DeleteButton, 
  Create, 
  SimpleForm, 
  TextInput, 
  Edit, 
  NumberField, 
  BooleanField, 
  ArrayField, 
  FileField, 
  FileInput, 
  ImageField, 
  SelectInput, 
  DateTimeInput, 
  NumberInput, 
  BooleanInput, 
  ImageInput, 
  ArrayInput, 
  SimpleFormIterator 
} from 'react-admin';
import { useLocation } from 'react-router-dom';

export const EventList: React.FC = () => {
  const location = useLocation();
  const highlightedEventId = location.state?.highlightedEventId;

  return (
    <List resource="events">
      <Datagrid
        rowStyle={(record) =>
          record.id === highlightedEventId ? { border: "2px solid red" } : {}
        }
      >
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
};

const acceptFormats: Accept = {
  'image/*': [],
};

const CustomToolbar = () => {
  const { setValue, getValues, trigger, handleSubmit } = useFormContext();
  const redirect = useRedirect();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleSave = async (status: 'PUBLISHED' | 'DRAFT') => {
    setValue('status', status);
    const isDraft = status === 'DRAFT';
  
    const formData = getValues();

    if (!isDraft) {
        // Vérification des champs obligatoires UNIQUEMENT si on publie l'événement
        const requiredFields = ['title', 'description', 'category', 'startDateTime', 'location', 'organizer'];
        const missingFields = requiredFields.filter(field => !formData[field]);
    
        if (missingFields.length > 0) {
            notify(`Champs obligatoires manquants: ${missingFields.join(', ')}`, { type: 'warning' });
            return; // Bloque la soumission
        }
    
        if (!formData.tickets || formData.tickets.length === 0) {
            notify("Ajoutez au moins un billet avant de publier", { type: 'warning' });
            return; // Bloque la soumission
        }
    }

    // Toutes les conditions sont remplies, exécute la soumission
    handleSubmit(async (data) => {
        try {
            await dataProvider.create('events', { data });
            notify(`Événement ${isDraft ? 'enregistré en brouillon' : 'publié'} avec succès`, { type: 'success' });
            redirect('list', 'events');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue s'est produite";
          notify(`Erreur lors de l'enregistrement : ${errorMessage}`, { type: 'error' });
        }        
    })();  
  };

  return (
    <Toolbar>
      <SaveButton label="Save" onClick={() => handleSave('PUBLISHED')} />
      <Button onClick={() => handleSave('DRAFT')} variant="contained" startIcon={<DraftsIcon />}>
        Draft
      </Button>
    </Toolbar>
  );
};

export const EventCreate = () => {

  return (
    <Create>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput source="title" label="Titre" />
        <TextInput source="description" label="Description" multiline />
        <SelectInput
          source="category"
          label="Catégorie"
          choices={[
            { id: 'CONCERT', name: 'Concert' },
            { id: 'CONFERENCE', name: 'Conférence' },
            { id: 'SPORT', name: 'Sport' }
          ]}
          parse={value => (value === "" ? null : value)} 
        />
        <DateTimeInput source="startDateTime" label="Date et heure de début" />
        <TextInput source="location" label="Lieu" />
        <TextInput source="status" defaultValue="PUBLISHED" style={{ display: 'none' }} />
        <TextInput source="organizer" label="Organisateur" />

        <ArrayInput source="tickets" label="Billets">
          <SimpleFormIterator>
            <TextInput source="name" label="Type" />
            <NumberInput source="price" label="Prix (€)" />
            <NumberInput source="quantityAvailable" label="Quantité Disponible" />
            <NumberInput source="purchaseLimitPerUser" label="Limite Achat" />
            <BooleanInput source="saleEnabled" label="Vente Active" />
          </SimpleFormIterator>
        </ArrayInput>

        <FileInput source="file" label="Image" accept={{ 'image/*': [] }}>
          <ImageField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

// 🔹 Formulaire d'édition
export const EventEdit: React.FC = () => (
  <Edit>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" />
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
      <TextInput source="status" style={{ display: 'none' }} />

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
        <ImageField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);