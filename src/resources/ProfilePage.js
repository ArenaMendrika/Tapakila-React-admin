import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useGetIdentity } from 'react-admin';

const ProfilePage = () => {
  const { data: user, isLoading } = useGetIdentity();

  if (isLoading) {
    return <Typography variant="h6" align="center">Chargement...</Typography>;
  }

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profil Utilisateur
        </Typography>
        <Typography variant="body1"><strong>Nom d'utilisateur :</strong> {user?.username || 'Inconnu'}</Typography>
        <Typography variant="body1"><strong>Email :</strong> {user?.email || 'Non renseigné'}</Typography>
        <Typography variant="body1"><strong>Rôle :</strong> {user?.role || 'Utilisateur'}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
