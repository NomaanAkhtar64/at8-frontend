import React from "react";
import { BrowserRouter } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import SideBarProvider from "./SideBarProvider";
import Dropdown from "../components/Dropdown";
import "./Layout.scss";
import logo from "../assets/at8_logo.jpg";

interface LayoutProps {}

const Nav: React.FC<{}> = () => {
    return (
        <>
            <Dropdown name="Tournaments"></Dropdown>
            <Dropdown name="FAQ"></Dropdown>
            <Dropdown name="Rules"></Dropdown>
            <Dropdown name="Help"></Dropdown>
            <Dropdown name="Announcements"></Dropdown>
        </>
    );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <BrowserRouter>
            <SideBarProvider>
                <Header name="AT8" logo={logo}>
                    <Nav />
                </Header>
                <main>{children}</main>
                <Footer></Footer>
            </SideBarProvider>
        </BrowserRouter>
    );
};

export default Layout;
