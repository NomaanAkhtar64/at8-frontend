import React from 'react'
import { Link } from 'react-router-dom'

export interface DropDownItemProps {
  count?: number
  text: string
  to?: string
  onClick?: () => void
  isPurple?: boolean
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  text,
  count,
  to,
  onClick,
  isPurple,
}) => {
  return (
    <div
      className='dd-item'
      style={{ top: 68 + (count - 1) * (isPurple ? 38 : 48) }}
    >
      {to ? (
        <Link to={to}>{text}</Link>
      ) : onClick ? (
        <span onClick={() => onClick()}>{text}</span>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}

export default DropDownItem
