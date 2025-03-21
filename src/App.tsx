import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { EventList, EventCreate, EventEdit } from './resources/events';
import { UserList, UserEdit } from './resources/users';
import { ReservationList } from './resources/reservations';
import { DraftEventList } from './resources/draftsEvents';
import LoginPage from './components/LoginPage';
import authProvider from './authProvider';
import HomePage from './components/HomePage';
import CustomLayout from './components/CustomLayout'; // Import du layout personnalisé

const App: React.FC = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={HomePage}
      layout={CustomLayout} // Utilisation du layout personnalisé
    >
      <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} options={{ id: 'eventId' }} />
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource name="reservations" list={ReservationList} />
      <Resource name="drafts" list={DraftEventList} />
    </Admin>
  );
};

export default App;