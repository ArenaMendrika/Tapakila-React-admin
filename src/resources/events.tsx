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
  CreateButton,
  Show,
  SimpleShowLayout,
  DateField,
  useRecordContext
} from "react-admin";
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
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
  return (
    <List resource="events">
      <Datagrid rowClick="show">
        <TextField source="category" label="Catégorie" />
        <TextField source="title" label="Titre" />
        <TextField source="description" label="Description" />
        <TextField source="startDateTime" label="Date & Heure" />
        <TextField source="location" label="Lieu" />
        <TextField source="organizer" label="Organisateur" />
        <TextField source="status" label="Statut" />
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
        <TextInput source="title" label="Titre" required />
        <TextInput source="description" label="Description" multiline required />
        <SelectInput
          source="category"
          label="Catégorie"
          choices={[
            { id: 'CONCERT', name: 'Concert' },
            { id: 'CONFERENCE', name: 'Conférence' },
            { id: 'SPORT', name: 'Sport' },
            { id: 'WORKSHOP', name: 'Workshop' },
            { id: 'MEETUP', name: 'Meetup' },
            { id: 'WEBINAR', name: 'Webinar' },
            { id: 'FESTIVAL', name: 'Festival' }
          ]}
          parse={value => (value === "" ? null : value)}
          required
        />
        <DateTimeInput source="startDateTime" label="Date et heure de début" required />
        <TextInput source="location" label="Lieu" required />
        <TextInput source="status" defaultValue="PUBLISHED" style={{ display: 'none' }} />
        <TextInput source="organizer" label="Organisateur" required />

        <ArrayInput source="tickets" label="Billets" required>
          <SimpleFormIterator>
            <TextInput source="name" label="Type" required />
            <NumberInput source="price" label="Prix (€)" required />
            <NumberInput source="quantityAvailable" label="Quantité Disponible" required />
            <NumberInput source="purchaseLimitPerUser" label="Limite Achat" required />
            <BooleanInput source="saleEnabled" label="Vente Active" required />
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

const CloudinaryImage = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const imageUrl = record?.[source];

  if (!imageUrl) return null;

  const transformedUrl = `${imageUrl}?w=600&h=400&c_fill`;

  return (
    <img
      src={transformedUrl}
      alt="Event"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover', 
        objectPosition: 'center', 
      }}
    />
  );
};

interface Ticket {
  name: string;
  price: number;
  quantityAvailable: number;
  purchaseLimitPerUser: number;
  saleEnabled: boolean;
}

// 🔹 Composant pour afficher les billets sous forme de cartes individuelles
const TicketList: React.FC = () => {
  const record = useRecordContext<{ tickets?: Ticket[] }>();
  if (!record || !record.tickets || record.tickets.length === 0) {
    return <Typography>Aucun billet disponible</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 3 }}>
      {record.tickets.map((ticket: Ticket, index: number) => (
        <Card key={index} sx={{ mb: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6">{ticket.name}</Typography>
            <Typography>Prix : {ticket.price} €</Typography>
            <Typography>Quantité : {ticket.quantityAvailable}</Typography>
            <Typography>Limite Achat : {ticket.purchaseLimitPerUser}</Typography>
            <Typography>Vente Active : {ticket.saleEnabled ? "Oui" : "Non"}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export const EventShow: React.FC = () => (
  <Show>
    <SimpleShowLayout>
      <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3, padding: 3 }}>
        <CardContent>
          <Grid container spacing={3}>

            {/* 🔹 Informations de l'événement */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5">
                <TextField source="title" />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Catégorie : <TextField source="category" />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Date & Heure : <DateField source="startDateTime" showTime />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Lieu : <TextField source="location" />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Organisateur : <TextField source="organizer" />
              </Typography>
            </Grid>

            {/* 🔹 Image */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  borderRadius: '8px',
                  boxShadow: 1,
                  padding: '1rem',
                  backgroundColor: '#fff',
                }}
              >
                <CloudinaryImage source="imageUrl" />
              </Box>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      {/* 🔹 Liste des billets */}
      <ArrayField source="tickets" label="Billets">
        <TicketList />
      </ArrayField>

    </SimpleShowLayout>
  </Show>
);


// Billet design 
// Search
// Paoziny list 
// Profile