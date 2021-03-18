import React from "react";
import { Link } from "react-router-dom";

import backDrop from "../assets/header-backdrop.png";

interface HeaderProps {
    name: string;
    logo: string;
}

const Header: React.FC<HeaderProps> = ({ name, logo, children }) => {
    return (
        <header className="main-header">
            <div className="site-name">
                <Link to="/">{name}</Link>
            </div>
            <div className="site-nav">{children}</div>
            <div className="header-backdrop">
                <img className="header-shadow" src={backDrop} alt="" />
            </div>
            <div className="account">
                <Link to="/signup" className="link-shadow link-animated_und">
                    SIGNUP
                </Link>
            </div>
        </header>
    );
};

export default Header;
