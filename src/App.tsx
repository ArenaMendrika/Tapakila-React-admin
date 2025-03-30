import React from 'react';
import { Admin, AdminRouter, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import CustomLayout from './components/CustomLayout';
import LoginPage from './components/LoginPage';
import ProfilePage from './resources/ProfilePage';
import { EventList, EventCreate, EventEdit, EventShow } from './resources/events';
import { UserList, UserEdit, UserCreate } from './resources/users';
import { ReservationList } from './resources/reservations';
import { DraftEventList } from './resources/draftsEvents';

const App: React.FC = () => {
  return (
    <AdminRouter>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        layout={CustomLayout}
      >
        <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} show={EventShow} />
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name="reservations" list={ReservationList} />
        <Resource name="drafts" list={DraftEventList} />

        {/* Routes personnalisées */}
        <CustomRoutes>
          <Route path="/profile" element={<ProfilePage />} />
        </CustomRoutes>
      </Admin>
    </AdminRouter>
  );
};

export default App;
