import React, { useState } from "react";
import { useGetIdentity, useUpdate } from "react-admin";

const ChangePassword: React.FC = () => {
  const { data: identity } = useGetIdentity();
  const [update] = useUpdate();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    try {
      await update(`users/${identity?.id}/password`, {
        data: {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
     });
          

      alert("Mot de passe mis à jour !");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Erreur API :", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div>
      <h2>Changer le Mot de Passe</h2>
      <label>
        Ancien mot de passe:
        <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} />
      </label>

      <label>
        Nouveau mot de passe:
        <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} />
      </label>

      <label>
        Confirmer le nouveau mot de passe:
        <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
      </label>

      <button onClick={handleUpdatePassword}>Modifier</button>
    </div>
  );
};

export default ChangePassword;
