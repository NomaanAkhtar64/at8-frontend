import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Dropdown from "../components/Dropdown";
import "./Layout.scss";
import Sidebar from "./SideBar";
import DropDownItem from "../components/DropDownItem";
import useGames from "../hooks/useGames";

interface LayoutProps {}

const Nav: React.FC<{}> = () => {
    const games = useGames();
    return (
        <>
            <Dropdown name="Tournaments">
                {games.state.map((game, i) => (
                    <DropDownItem
                        key={i}
                        to={`/tournament/${game.slug}`}
                        text={game.name}
                    />
                ))}
            </Dropdown>
            <Dropdown name="Rules"></Dropdown>
            <Dropdown name="FAQ"></Dropdown>
            <div className="black-link">
                <Link to="/announcements">Announcements</Link>
            </div>
        </>
    );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setSidebar] = useState(false);

    return (
        <BrowserRouter>
            {isSidebarOpen ? (
                <Sidebar
                    closeSidebar={() => {
                        setSidebar(false);
                    }}
                >
                    <Nav />
                </Sidebar>
            ) : (
                <>
                    <Header
                        name="AT8"
                        isSidebarOpen={isSidebarOpen}
                        openSidebar={() => {
                            setSidebar(true);
                        }}
                    >
                        <Nav />
                    </Header>
                    <main>{children}</main>
                    <Footer></Footer>
                </>
            )}
        </BrowserRouter>
    );
};

export default Layout;
