import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { EventList, EventCreate, EventEdit } from './resources/events';
import { TicketList, TicketCreate, TicketEdit } from './resources/tickets';
import { UserList, UserEdit } from './resources/users';
import { ReservationList } from './resources/reservations';

const App: React.FC = () => {
  return (
    <Admin dataProvider={dataProvider}>
      {/* JSONPlaceholder "posts" pour les événements */}
      <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} options={{id: 'eventId'}} />

      {/* JSONPlaceholder "comments" pour les billets */}
      <Resource name="comments" list={TicketList} create={TicketCreate} edit={TicketEdit} />

      {/* JSONPlaceholder "users" pour la gestion des utilisateurs */}
      <Resource name="users" list={UserList} edit={UserEdit} />

      {/* JSONPlaceholder "albums" pour les réservations (c'est temporaire) */}
      <Resource name="albums" list={ReservationList} />
    </Admin>
  );
};

export default App;