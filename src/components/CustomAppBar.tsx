import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Box, Button, Typography } from '@mui/material';
import { Notifications, PowerSettingsNew, Search } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from 'react-admin';

const CustomAppBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar
  sx={{
    top: 0,
    left: "200px",
    width: "calc(100% - 200px)",
    background: "linear-gradient(90deg, rgba(224, 195, 252, 0.9), rgba(142, 197, 252, 0.9))",
    backdropFilter: "blur(8px)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.12)",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    padding: "4px 20px",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      background: "linear-gradient(90deg, rgba(224, 195, 252, 1), rgba(142, 197, 252, 1))",
      boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.15)",
    },

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
    onClick={handleLogout}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      color: 'white',
      background: 'linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)',
      padding: '10px 18px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'none',
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      
      '&:hover': {
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.25)',
      },
      
      '&:active': {
        background: 'linear-gradient(135deg, #d500f9 0%, #ff4081 100%)',
        transform: 'scale(0.98)',
      }
    }}
  >
    <PowerSettingsNew sx={{ fontSize: 22 }} />
    Déconnexion
  </Button>
</Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;