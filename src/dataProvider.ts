import { DataProvider, fetchUtils, RaRecord, Identifier } from 'react-admin';

const API_URL = 'http://localhost:8080';
const httpClient = fetchUtils.fetchJson;

interface EventData {
  id?: Identifier;
  title?: string;
  description?: string;
  category?: string;
  startDateTime?: string;
  location?: string;
  organizer?: string;
  tickets?: any[];
  status?: 'PUBLISHED' | 'DRAFT';
  file?: { rawFile: File };
}

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'id', order = 'ASC' } = params.sort || {};
    
    const url = `${API_URL}/${resource}?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;
    const { json } = await httpClient(url);
    
    let data = json;
    if (resource === 'events') {
      data = data.filter((event: EventData) => event.status === 'PUBLISHED');
    }
    
    return {
      data,
      total: json.length,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },

  create: async (resource, params) => {
    if (resource === 'events') {
      const eventData: EventData = { ...params.data, status: params.data.status || 'PUBLISHED' };
      const isDraft = eventData.status === 'DRAFT';
      const formData = new FormData();
      delete eventData.file;
      
      formData.append('event', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
      
      if (!isDraft) {
        const requiredFields: (keyof EventData)[] = ['title', 'description', 'category', 'startDateTime', 'location', 'organizer'];
        const missingFields = requiredFields.filter(field => !eventData[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
        }
        
        if (!eventData.tickets || eventData.tickets.length === 0) {
          throw new Error("Ajoutez au moins un billet avant de publier.");
        }
      }
      
      if (params.data.file?.rawFile) {
        formData.append('file', params.data.file.rawFile);
      }
      
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${errorText}`);
      }
      
      const json = await response.json();
      return { data: json };
    }
    
    return httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  update: async (resource, params) => {
    if (resource === 'users' && params.data.newPassword) {
      return httpClient(`${API_URL}/users/${params.id}/password`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }

    if (resource === 'users') {
      return httpClient(`${API_URL}/users/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }    
    
    if (resource === 'events') {
      const eventData: EventData = { ...params.data };
      const formData = new FormData();
      delete eventData.file;
      
      formData.append('event', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
      
      if (params.data.file?.rawFile) {
        formData.append('file', params.data.file.rawFile);
      }
      
      const response = await fetch(`${API_URL}/events/${params.data.id}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${errorText}`);
      }
      
      const json = await response.json();
      return { data: json };
    }
    
    return httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },
  
  getMany: async (resource, params) => {
    const url = `${API_URL}/${resource}?id=${params.ids.join(',')}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getManyReference: async (resource, params) => {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'id', order = 'ASC' } = params.sort || {};
    
    const url = `${API_URL}/${resource}?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}&${params.target}=${params.id}`;
    const { json } = await httpClient(url);
    
    return { data: json, total: json.length };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(id => 
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }).then(({ json }) => json)
      )
    );
    return { data: responses.map(res => res.id) };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map(id => 
        httpClient(`${API_URL}/${resource}/${id}`, { method: 'DELETE' })
      )
    );
    return { data: params.ids };
  },
};

export default dataProvider;
