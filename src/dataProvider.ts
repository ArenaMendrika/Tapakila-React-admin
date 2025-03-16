import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:8080';

const baseDataProvider = simpleRestProvider(API_URL);

const customDataProvider: DataProvider = {
  ...baseDataProvider,

  create: async (resource, params) => {
    if (resource === 'events') {
      const formData = new FormData();
  
      // Convert params.data en JSON string et ajouter dans formData
      const eventData = { ...params.data };
      delete eventData.file; // On enlève le fichier du JSON si existant
  
      formData.append('event', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
  
      // Ajout du fichier si il existe
      if (params.data.file && params.data.file.rawFile) {
        formData.append('file', params.data.file.rawFile);
      }
  
      // Envoi de la requête POST avec multipart/form-data
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement");
      }
  
      const json = await response.json();
      return { data: json };
    }
  
    return baseDataProvider.create(resource, params);
  },
};

export default customDataProvider;