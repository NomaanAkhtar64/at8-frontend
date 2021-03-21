import React from 'react'
import { Link } from 'react-router-dom'

export interface DropDownItemProps {
  count?: number
  text: string
  to: string
}

const DropDownItem: React.FC<DropDownItemProps> = ({ text, count, to }) => {
  return (
    <div className='dd-item' style={{ top: 68 + (count - 1) * 48 }}>
      <Link to={to}>{text}</Link>
    </div>
  )
}

export default DropDownItem
