import React, { useState } from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = () => {
    setLoading(true);
    setTimeout(() => {
      if (passwords.newPassword === passwords.confirmPassword) {
        setSuccess("Mot de passe changé avec succès!");
        setError("");
      } else {
        setError("Les mots de passe ne correspondent pas.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        marginLeft: 0, // Aligné à gauche
        padding: "20px",
      }}
    >
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{  fontSize: "14px", color: "#333" , fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>
          Ancien mot de passe
        </label>
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid #d1d1d1",
            backgroundColor: "#f3f3f3",
            outline: "none",
            transition: "all 0.3s ease-in-out",
            fontSize: "16px",
          }}
          onFocus={(e) => (e.target.style.border = "2px solid #673ab7")}
          onBlur={(e) => (e.target.style.border = "2px solid #d1d1d1")}
        />

        <label style={{fontSize: "14px", color: "#333", fontFamily: '"Poppins", "Roboto", "Arial", sans-serif' }}>
          Nouveau mot de passe
        </label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid #d1d1d1",
            backgroundColor: "#f3f3f3",
            outline: "none",
            transition: "all 0.3s ease-in-out",
            fontSize: "16px",
          }}
          onFocus={(e) => (e.target.style.border = "2px solid #673ab7")}
          onBlur={(e) => (e.target.style.border = "2px solid #d1d1d1")}
        />

        <label style={{fontSize: "14px", color: "#333" , fontFamily: '"Poppins", "Roboto", "Arial", sans-serif'}}>
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid #d1d1d1",
            backgroundColor: "#f3f3f3",
            outline: "none",
            transition: "all 0.3s ease-in-out",
            fontSize: "16px",
          }}
          onFocus={(e) => (e.target.style.border = "2px solid #673ab7")}
          onBlur={(e) => (e.target.style.border = "2px solid #d1d1d1")}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdatePassword}
          disabled={loading}
          sx={{
            width: "30%",
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
          {loading ? <CircularProgress size={24} /> : "Modifier"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
