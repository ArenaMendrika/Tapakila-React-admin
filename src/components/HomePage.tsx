import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Contenu principal */}
      <Card sx={{ margin: '20px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4">Bienvenue sur le tableau de bord</Typography>
          <Typography variant="body1">
            Consultez les statistiques des événements, gérez les utilisateurs et surveillez les réservations.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
