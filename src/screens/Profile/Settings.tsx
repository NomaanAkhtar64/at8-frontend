import React, { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import EditUser from "../../forms/EditUser";
import ChangePassword from "../../forms/ChangePassword";
import EditProfilePic from "../../forms/EditProfilePic";
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const profile = useProfile();

  useEffect(() => {
    document.title = "Settings - AT8";
  }, []);
  return (
    <div className="profile-data">
      <div className="profile-pic">
        <EditProfilePic profile={profile.profile} />
      </div>
      <div className="profile">
        <EditUser user={profile.state} profile={profile.profile} />
      </div>
      <div className="password-form ">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Settings;
