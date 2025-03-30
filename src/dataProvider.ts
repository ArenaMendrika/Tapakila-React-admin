import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:8080';

const baseDataProvider = simpleRestProvider(API_URL);

const customDataProvider: DataProvider = {
  ...baseDataProvider,

  getList: async (resource, params) => {
    const response = await baseDataProvider.getList(resource, params);

    if (resource === 'events') {
      const filteredData = response.data.filter(event => event.status === 'PUBLISHED');

      return {
        ...response,
        data: filteredData,
        total: filteredData.length,
      };
    }

    return response;
  },

  create: async (resource, params) => {
    if (resource === 'events') {
      const isDraft = params.data.status === 'DRAFT';
      const eventData: any = { 
        ...params.data, 
        status: params.data.status || 'PUBLISHED' 
      };

      if (!isDraft) {
        const requiredFields = ['title', 'description', 'category', 'startDateTime', 'location', 'organizer'];
        const missingFields = requiredFields.filter(field => !eventData[field]);

        if (missingFields.length > 0) {
          throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
        }

        if (!eventData.tickets || eventData.tickets.length === 0) {
          throw new Error("Ajoutez au moins un billet avant de publier.");
        }
      }

      if (params.data.id) {
        // Si l'ID existe, nous mettons à jour l'événement
        const response = await fetch(`${API_URL}/events/${params.data.id}`, {
          method: 'PUT', // Utilisez PUT pour la mise à jour
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur serveur: ${errorText}`);
        }

        const json = await response.json();
        return { data: json };
      } else {
        // Créer un nouvel événement
        const response = await fetch(`${API_URL}/events`, {
          method: 'POST', // Utilisez POST pour la création
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur serveur: ${errorText}`);
        }

        const json = await response.json();
        return { data: json };
      }
    }

    return baseDataProvider.create(resource, params);
  }
};

export default customDataProvider;