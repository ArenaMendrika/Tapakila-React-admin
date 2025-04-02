import React from "react";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <EditProfile />
      <ChangePassword />
    </div>
  );
};

export default ProfilePage;
