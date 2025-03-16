import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { EventList, EventCreate, EventEdit} from './resources/events';
import { UserList, UserEdit } from './resources/users';
import { ReservationList } from './resources/reservations';
import { DraftEventList } from './resources/draftsEvents';

const App: React.FC = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} options={{id: 'eventId'}}/>

      <Resource name="users" list={UserList} edit={UserEdit} />

      <Resource name="reservations" list={ReservationList} />

      <Resource name="drafts" list={DraftEventList}/>
    </Admin>
  );
};

export default App;