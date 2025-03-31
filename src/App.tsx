import React, { useEffect, useState } from 'react';
import { Admin, AdminRouter, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Typography, TextField } from '@mui/material'; // Assurez-vous d'importer les composants nécessaires
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import CustomLayout from './components/CustomLayout';
import LoginPage from './components/LoginPage';
import ProfilePage from './resources/ProfilePage';
import { EventList, EventCreate, EventEdit, EventShow } from './resources/events';
import { UserList, UserEdit, UserCreate } from './resources/users';
import { ReservationList } from './resources/reservations';
import { DraftEventList } from './resources/draftsEvents';
import Dashboard from './resources/dashboard';

const App: React.FC = () => {
  const [theme, setTheme] = useState<any>(createTheme({}));

  // Utiliser useEffect pour ajouter les polices Poppins et Dancing Script
  useEffect(() => {
    const linkPoppins = document.createElement('link');
    linkPoppins.rel = 'stylesheet';
    linkPoppins.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    document.head.appendChild(linkPoppins);

    const linkDancingScript = document.createElement('link');
    linkDancingScript.rel = 'stylesheet';
    linkDancingScript.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap';
    document.head.appendChild(linkDancingScript);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AdminRouter>
        <Admin
          dashboard={Dashboard} 
          dataProvider={dataProvider}
          authProvider={authProvider}
          loginPage={LoginPage}
          layout={CustomLayout}
        >
          <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} show={EventShow} />
          <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
          <Resource name="reservations" list={ReservationList} />
          <Resource name="drafts" list={DraftEventList} />

          <CustomRoutes>
            <Route path="/profile" element={<ProfilePage />} />
          </CustomRoutes>
        </Admin>
      </AdminRouter>
    </ThemeProvider>
  );
};

export default App;