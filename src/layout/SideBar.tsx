import React from 'react'

interface SidebarProps {
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return <div className='sidebar'></div>
}

export default Sidebar
