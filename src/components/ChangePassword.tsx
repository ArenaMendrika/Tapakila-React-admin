import React, { useState } from "react";
import { useGetIdentity } from "react-admin";

const ChangePassword: React.FC = () => {
  const { data: identity } = useGetIdentity();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async () => {
    setError(null);
    setSuccess(null);

    if (!identity?.id) {
      setError("Utilisateur non identifié.");
      return;
    }

    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    // 🔍 Vérification des valeurs AVANT envoi
    console.log("Valeurs envoyées :", passwords);

    try {
      const response = await fetch(`http://localhost:8080/users/${identity.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la mise à jour.");
      }

      setSuccess("Mot de passe mis à jour avec succès !");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Changer le Mot de Passe</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Ancien mot de passe"
          value={passwords.oldPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le nouveau mot de passe"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />
        <button onClick={handleUpdatePassword} disabled={loading}>
          {loading ? "Modification..." : "Modifier"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
