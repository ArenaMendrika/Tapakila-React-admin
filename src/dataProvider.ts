import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const API_URL = 'http://localhost:8080';

const baseDataProvider = simpleRestProvider(API_URL);

const customDataProvider: DataProvider = {
  ...baseDataProvider,

  create: async (resource, params) => {
    if (resource === 'events') {
      const formData = new FormData();
  
      const eventData: any = { 
        ...params.data, 
        status: params.data.status || 'PUBLISHED' 
      };
      
      delete eventData.file;
  
      formData.append('event', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
  
      if (params.data.file && params.data.file.rawFile) {
        formData.append('file', params.data.file.rawFile);
      }
  
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
  }  
};

export default customDataProvider;