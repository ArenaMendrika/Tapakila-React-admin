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

  const handleUpdateUsername = async () => {
    console.log("Tentative de mise à jour du nom d'utilisateur...");
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!userId || !refreshToken) {
        console.error("Erreur: ID utilisateur ou refresh token introuvable.");
        return;
    }

    console.log("Données envoyées pour mise à jour:", { username });

    setLoading(true);
    try {
        // Étape 1 : Mettre à jour l'username
        const response = await updateUserData(userId, { username });
        console.log("Réponse de l'API après mise à jour:", response);

        // Étape 2 : Rafraîchir le token après l'update
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            console.log("Nouveau token stocké !");
        } else {
            console.error("Échec du rafraîchissement du token.");
        }

        alert("Nom d'utilisateur mis à jour !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        alert("Erreur lors de la mise à jour.");
    } finally {
        setLoading(false);
        console.log("Chargement terminé.");
    }
};

// ✅ Mise à jour du username via API
const updateUserData = async (userId: string, data: { username: string }) => {
    const API_URL = "http://localhost:8080"; 
    console.log(`Appel à l'API pour mettre à jour l'utilisateur ${userId}...`);
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur serveur:", errorText);
        throw new Error(`Erreur serveur: ${errorText}`);
    }

    return await response.json();
};

// ✅ Rafraîchir le token après la mise à jour
const refreshAccessToken = async (refreshToken: string) => {
    const API_URL = "http://localhost:8080/auth/refresh";

    console.log("Tentative de rafraîchissement du token...");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        console.error("Échec du rafraîchissement du token.");
        return null;
    }

    const data = await response.json();
    console.log("Nouveau token reçu:", data.accessToken);
    return data.accessToken;
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
