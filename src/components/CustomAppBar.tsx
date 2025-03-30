import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Box, Button, Typography } from '@mui/material';
import { Notifications, PowerSettingsNew, Search } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from 'react-admin';

const CustomAppBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // Ajoute useNavigate ici
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redirige vers la page du profil
  };

  return (
    <AppBar
      sx={{
        top: 0,
        left: '200px',
        width: 'calc(100% - 200px)',
        background: 'linear-gradient(90deg, #E0C3FC, #8EC5FC)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '250px',
            '& .MuiOutlinedInput-root': { borderRadius: '20px', paddingRight: '8px' },
          }}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={handleProfileClick} // Ajout de la fonction ici
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff4081',
                color: 'white',
              },
              padding: '6px 12px',
              borderRadius: '12px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Typography component="span" sx={{ color: 'white' }}>
              Profile
            </Typography>
            <Notifications sx={{ color: 'white' }} />
          </Button>
          <span style={{ color: 'white', fontSize: '20px' }}>|</span>
          <Button
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff4081',
                color: 'white',
              },
              '&:active': {
                backgroundColor: '#d500f9',
              },
              padding: '6px 12px',
              borderRadius: '12px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Typography component="span" sx={{ color: 'white' }}>
              Logout
            </Typography>
            <PowerSettingsNew sx={{ color: 'white' }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;