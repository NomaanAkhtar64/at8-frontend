import React, { useState } from "react";

interface DropdownProps {
    name: string;
}

const Dropdown: React.FC<DropdownProps> = ({ name, children }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div
            className={`black-link black-dropdown ${isOpen && "open-link"}`}
            onClick={() => {
                setOpen(!isOpen);
            }}
        >
            <span>{name}</span>
            {isOpen && children}
        </div>
    );
};

export default Dropdown;
