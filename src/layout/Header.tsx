import React from "react";
import { Link, useHistory } from "react-router-dom";

import backDrop from "../assets/header-backdrop.png";
import AT8 from "../assets/AT8 logo - Copy.png";
import Dropdown from "../components/Dropdown";
import DropDownItem from "../components/DropDownItem";
import defaultProfilePic from "../assets/default-profile-picture.png";
import useUser from "../hooks/user";

interface HeaderProps {
  isSidebarOpen: boolean;
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  children,
  isSidebarOpen,
  openSidebar,
}) => {
  const history = useHistory();
  const user = useUser();
  const profile = user.state.profile;
  return (
    <header className="main-header">
      {!isSidebarOpen && (
        <div
          className="open-sidebar"
          onClick={() => {
            openSidebar();
          }}
        >
          <svg
            className="MuiSvgIcon-root jss174"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </div>
      )}
      <div className="header-wrapper">
        <div className="site-name">
          <Link to="/">
            <img src={AT8} alt="AT8" style={{ marginTop: "-2px" }} />
          </Link>
        </div>
        <div className="site-nav">{children}</div>
        <div className="header-backdrop">
          <img className="header-shadow" src={backDrop} alt="" />
        </div>
        <div className="account">
          {user.isLogin ? (
            <>
              <Dropdown
                name={
                  <img
                    src={profile.pic ? profile.pic : defaultProfilePic}
                    className="profile-pic"
                    onDoubleClick={() => {
                      history.push("/profile/settings");
                    }}
                    style={{
                      marginRight: 10,
                    }}
                    alt=""
                  />
                }
                variant="purple"
              >
                <DropDownItem text="Settings" to="/profile/settings" />
                <DropDownItem text="My Entries" to="/profile/entries" />
                <DropDownItem text="My Teams" to="/profile/teams" />
                <DropDownItem
                  text="Logout"
                  onClick={() => {
                    user.actions.logout();
                    history.push("/");
                  }}
                />
              </Dropdown>
            </>
          ) : (
            <Link
              to="/signup"
              className="link-shadow link-animated_und"
              style={{ textDecoration: "none" }}
            >
              SIGNUP
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
