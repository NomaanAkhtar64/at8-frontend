import React, { useState } from "react";
import Sidebar from "./SideBar";

interface SideBarProviderProps {}

const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
    const [isSidebarOpen, setSidebar] = useState(false);
    return (
        <>
            {!isSidebarOpen && (
                <div className="open-sidebar">
                    <svg
                        className="MuiSvgIcon-root jss174"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        width="40px"
                        onClick={() => {
                            setSidebar(true);
                        }}
                    >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </div>
            )}

            {isSidebarOpen ? (
                <Sidebar
                    closeSidebar={() => {
                        setSidebar(false);
                    }}
                />
            ) : (
                children
            )}
        </>
    );
};

export default SideBarProvider;
