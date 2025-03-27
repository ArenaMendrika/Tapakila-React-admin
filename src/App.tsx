import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { EventList, EventCreate, EventEdit } from './resources/events';
import { UserList, UserEdit, UserCreate } from './resources/users';
import { ReservationList } from './resources/reservations';
import { DraftEventList } from './resources/draftsEvents';
import LoginPage from './components/LoginPage';
import authProvider from './authProvider';
import CustomLayout from './components/CustomLayout';

const App: React.FC = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={CustomLayout}
    >
      <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} />
      <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
      <Resource name="reservations" list={ReservationList} />
      <Resource name="drafts" list={DraftEventList} />
    </Admin>
  );
};

export default App;