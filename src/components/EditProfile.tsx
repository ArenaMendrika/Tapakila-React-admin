import React, { useEffect, useState } from "react";

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [editUsername, setEditUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupérer l'identité (remplacer par une fonction réelle)
  useEffect(() => {
    console.log("Récupération de l'identité depuis localStorage...");
    const identity = JSON.parse(localStorage.getItem("identity") || "{}");
    console.log("Identité récupérée:", identity);

    if (identity) {
      setUsername(identity.username || "");
      console.log("Nom d'utilisateur initial:", identity.username);
    }
  }, []);

  // Fonction d'update personnalisée qui appelle ton dataProvider
  const handleUpdateUsername = async () => {
    console.log("Tentative de mise à jour du nom d'utilisateur...");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Erreur: ID utilisateur introuvable.");
      return;
    }

    console.log("Données envoyées pour mise à jour:", { username });

    setLoading(true);
    try {
      // Appel direct au dataProvider pour mettre à jour
      const response = await updateUserData(userId, { username });
      console.log("Réponse de l'API après mise à jour:", response);

      alert("Nom d'utilisateur mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour via API:", error);
      alert("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
      console.log("Chargement terminé.");
    }
  };

  // Fonction personnalisée pour appeler ton dataProvider
  const updateUserData = async (userId: string, data: { username: string }) => {
    const API_URL = "https://your-api-url.com"; // Remplace par ton URL d'API
    console.log(`Appel à l'API pour mettre à jour l'utilisateur ${userId}...`);
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur serveur:", errorText);
      throw new Error(`Erreur serveur: ${errorText}`);
    }

    const json = await response.json();
    console.log("Réponse JSON de l'API:", json);
    return json;
  };

  return (
    <div>
      <h2>Modifier le Profil</h2>
      <label>
        Nom d'utilisateur:
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log("Nom d'utilisateur modifié:", e.target.value);
          }}
          disabled={!editUsername}
        />
        <button type="button" onClick={() => setEditUsername(!editUsername)}>
          {editUsername ? "Annuler" : "Modifier"}
        </button>
      </label>
      {editUsername && !loading && <button onClick={handleUpdateUsername}>Enregistrer</button>}
      {loading && <p>Chargement...</p>}
    </div>
  );
};

export default EditProfile;
