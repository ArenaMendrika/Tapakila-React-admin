import React, { useState, useEffect, useRef } from 'react';
import { AppBar, UserMenu } from 'react-admin';
import { Toolbar, IconButton, TextField, CircularProgress, List, ListItem, ListItemText, Box, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomAppBar = (props: any) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      fetch(`http://localhost:8080/search?q=${search}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error('Erreur:', error))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [search]);

  // Gestion des clics en dehors de la barre de recherche
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    navigate('/events', { state: { highlightedEventId: id } });
    setSearch('');
    setResults([]);
  };

  return (
    <AppBar {...props}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Espace pour aligner la recherche à droite */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Barre de recherche (placée à droite) */}
        <Box ref={searchRef} sx={{ position: 'relative' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: '20px',
              width: '250px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                paddingRight: '8px',
              },
            }}
            InputProps={{
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={18} sx={{ marginRight: 1 }} /> : null}
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                </>
              ),
            }}
          />
          {results.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                top: '40px',
                right: 0,
                width: '250px',
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: '10px',
                zIndex: 10,
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              <List>
                {results.map((event) => (
                  <ListItem
                    key={event.id}
                    onClick={() => handleSelect(event.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      padding: '10px 14px',
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={event.category}
                      primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: '0.8rem', color: 'gray' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;