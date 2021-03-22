import React, { useEffect, useRef, useState } from 'react'
import './DropDown.scss'
import { DropDownItemProps } from './DropDownItem'
import DropDownClose from '../assets/dropdown-close.png'
import DropDownOpen from '../assets/dropdown-open.png'
import { useLocation } from 'react-router'

interface DropdownProps {
  name: string
  children?:
    | React.ReactElement<DropDownItemProps>[]
    | React.ReactElement<DropDownItemProps>
}

const Dropdown: React.FC<DropdownProps> = ({ name, children }) => {
  const [isOpen, setOpen] = useState(false)
  const counter = useRef(0)
  const location = useLocation()

  useEffect(() => {
    if (counter.current !== 0) {
      setOpen(false)
    }
    counter.current++
  }, [location])

  return (
    <div className={`black-link black-dropdown ${isOpen && 'open-link'}`}>
      <div
        className='dd-title'
        onClick={() => {
          setOpen(!isOpen)
        }}
      >
        <span>{name}</span>
        <img
          src={isOpen ? DropDownOpen : DropDownClose}
          alt=''
          width='12px'
          height='8px'
        />
      </div>
      <div className='dd-container'>
        {isOpen && children && (
          <>
            {Array.isArray(children)
              ? children.map((dropdown, index) =>
                  React.cloneElement(dropdown, { count: index + 1 })
                )
              : React.cloneElement(children, { count: 1 })}
          </>
        )}
      </div>
    </div>
  )
}

export default Dropdown
