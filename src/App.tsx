import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { EventList, EventCreate, EventEdit} from './resources/events';
import { TicketList, TicketCreate, TicketEdit } from './resources/tickets';
import { UserList, UserEdit } from './resources/users';
import { ReservationList } from './resources/reservations';

const App: React.FC = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} options={{id: 'eventId'}} />

      <Resource name="users" list={UserList} edit={UserEdit} />

      <Resource name="reservations" list={ReservationList} />
    </Admin>
  );
};

export default App;