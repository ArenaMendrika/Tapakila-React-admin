import React, { useState } from "react";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [editUsername, setEditUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateUsername = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Nom d'utilisateur mis à jour!");
    }, 1000);
  };

  return (
<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
    Modifier le Profil
  </Typography>

  <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "500px", gap: "16px" }}>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      disabled={!editUsername}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "2px solid #d1d1d1",
        backgroundColor: editUsername ? "#ffffff" : "#f3f3f3",
        outline: "none",
        transition: "all 0.3s ease-in-out",
        fontSize: "16px",
      }}
      onFocus={(e) => (e.target.style.border = "2px solid #673ab7")}
      onBlur={(e) => (e.target.style.border = "2px solid #d1d1d1")}
    />

    <Box sx={{ display: "flex", gap: "10px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditUsername(!editUsername)}
        sx={{
          width: "20%",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "600",
          borderRadius: "10px",
          border: "2px solid #6a4c93",
          boxShadow: 3,
          color: "#555",
          background: "white",
          "&:hover": {
            background: "#6a4c93",
            boxShadow: "0 4px 20px rgba(142, 68, 173, 0.4)",
            color: 'white'
          },
          transition: "all 0.3s ease",
           fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'
        }}
      >
        {editUsername ? "Annuler" : "Modifier"}
      </Button>
      {editUsername && !loading && (
        <Button variant="contained" color="secondary" onClick={handleUpdateUsername} sx={{
          width: "20%",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "600",
          borderRadius: "10px",
          border: "2px solid #6a4c93",
          boxShadow: 3,
          color: "#555",
          background: "white",
          "&:hover": {
            background: "#6a4c93",
            boxShadow: "0 4px 20px rgba(142, 68, 173, 0.4)",
            color: 'white'
          },
          transition: "all 0.3s ease",
           fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'
        }}>
          Enregistrer
        </Button>
      )}
    </Box>

    {loading && (
      <Box sx={{ marginTop: "10px" }}>
        <CircularProgress />
      </Box>
    )}
  </Box>
</Box>

  );
};

export default EditProfile;
