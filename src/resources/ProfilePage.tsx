import React, { useState } from "react";
import { Box, Button, Typography, Collapse } from "@mui/material";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

const ProfilePage: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<"username" | "password" | null>(null);
  const [openUsername, setOpenUsername] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  // Fonction pour afficher le formulaire en fonction de la sélection de l'utilisateur
  const handleFormSelection = (form: "username" | "password") => {
    if (form === "username") {
      setSelectedForm("username");
      setOpenUsername(true);
      setOpenPassword(false);
    } else if (form === "password") {
      setSelectedForm("password");
      setOpenUsername(false);
      setOpenPassword(true);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#fff", boxShadow: 3, borderRadius: "8px" }}>
      {/* Titre et description */}
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", color: "#6a4c93" , fontFamily: '"Dancing Script", cursive', fontSize: '2.8rem'}}>
        Modifier votre profil
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "30px", color: "#555",  fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
        Choisissez l'option que vous souhaitez modifier, puis mettez à jour vos informations personnelles.
      </Typography>
      {/* Boutons pour sélectionner le formulaire */}
      <Box sx={{ display: "flex", justifyContent: "space-evenly", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFormSelection("username")}
          sx={{
            width: "45%",
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
          Modification nom
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleFormSelection("password")}
          sx={{
            width: "45%",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "10px",
            color: "#555",
            background: "white",
            border: "2px solid #6a4c93",
            boxShadow: 3,
            "&:hover": {
              background: "#6a4c93",
              boxShadow: "0 4px 20px rgba(142, 68, 173, 0.4)",
              color: 'white'
            },
            transition: "all 0.3s ease",
            
          }}
        >
          Modification mot de passe
        </Button>
      </Box>

      {/* Formulaire selon la sélection avec animation */}
      <Collapse in={openUsername} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: "20px" }}>
          <EditProfile />
        </Box>
      </Collapse>

      <Collapse in={openPassword} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: "20px" }}>
          <ChangePassword />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProfilePage;
