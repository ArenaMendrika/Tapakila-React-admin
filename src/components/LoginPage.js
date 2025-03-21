//src/components/LoginPage.js

import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // ✅ "email" au lieu de "username"
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(credentials); // ✅ Envoie { email, password }
      notify("Connexion réussie !", { type: "success" });
    } catch (error) {
      notify("Identifiants incorrects", { type: "error" });
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: "10%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Connexion Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email" // ✅ Correction de l'affichage
            margin="normal"
            value={credentials.email} // ✅ Correction de la valeur
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} // ✅ Correction de l'update
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;