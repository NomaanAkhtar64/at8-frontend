import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import backDrop from "../assets/header-backdrop.png";
import logo from "../assets/AT8-Logo.png";
import * as actions from "../store/actions/auth";
import Dropdown from "../components/Dropdown";
import DropDownItem from "../components/DropDownItem";
import defaultProfilePic from "../assets/default-profile-picture.png";
import useProfile from "../hooks/useProfile";

interface HeaderProps {
    name: string | React.ReactElement;
    isSidebarOpen: boolean;
    openSidebar: () => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
    name,
    children,
    isSidebarOpen,
    openSidebar,
    isAuthenticated,
    onLogout,
}) => {
    const history = useHistory();
    const profile = useProfile();
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
                        width="40px"
                    >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </div>
            )}
            <div className="header-wrapper">
                <div className="site-name">
                    <Link to="/">
                        {/* {name} */}
                        <img
                            src={logo}
                            alt="AT8"
                            width="46px"
                            style={{ marginTop: "-2px" }}
                        />
                    </Link>
                </div>
                <div className="site-nav">{children}</div>
                <div className="header-backdrop">
                    <img className="header-shadow" src={backDrop} alt="" />
                </div>
                <div className="account">
                    {isAuthenticated ? (
                        <>
                            {profile.hasLoaded && (
                                <Dropdown
                                    name={
                                        <img
                                            src={
                                                profile.profile.pic
                                                    ? profile.profile.pic
                                                    : defaultProfilePic
                                            }
                                            width="40px"
                                            height="40px"
                                            onDoubleClick={() => {
                                                history.push("/profile");
                                            }}
                                            style={{
                                                marginRight: 10,
                                                borderRadius: "25%",
                                            }}
                                            alt=""
                                        />
                                    }
                                    variant="purple"
                                >
                                    <DropDownItem
                                        text="Profile"
                                        to="/profile"
                                    />
                                    <DropDownItem
                                        text="Logout"
                                        onClick={() => onLogout()}
                                    />
                                </Dropdown>
                            )}
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

const mapStateToProps = (state: UserState) => {
    return {
        isAuthenticated: state.token !== null,
    };
};
const mapDispatchToProps = (dispatchEvent) => {
    return {
        onLogout: () => dispatchEvent(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
