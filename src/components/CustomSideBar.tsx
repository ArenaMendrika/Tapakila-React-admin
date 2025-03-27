import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const CustomSidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          background: 'linear-gradient(180deg, #E0C3FC, #8EC5FC)',
          color: '#333',
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem component="div" onClick={() => navigate('/dashboard')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Events */}
        <ListItem component="div" onClick={() => navigate('/events')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>

        {/* Events */}
        <ListItem component="div" onClick={() => navigate('/users')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><AccountCircle/></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

      </List>
    </Drawer>
  );
};

export default CustomSidebar;