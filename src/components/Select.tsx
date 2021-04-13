import React, { useMemo } from 'react'
import camelToWords from '../utils/camelToWords'
let fieldCount = 0

interface SelectProps {
  label?: string
  children: JSX.IntrinsicElements['select']['children']
  name: string
  containerClass?: string
  fieldClass?: string
  value?: JSX.IntrinsicElements['select']['value']
  onChange?: JSX.IntrinsicElements['select']['onChange']
}

const Select: React.FC<SelectProps> = ({
  label,
  children,
  name,
  containerClass = 'form-group',
  fieldClass = 'form-control',
  value = '',
  onChange,
}) => {
  const id = useMemo(() => `${name.toLowerCase()}-${fieldCount++}`, [name])
  return (
    <div className={containerClass}>
      <label htmlFor={id}>{label ? label : camelToWords(name)}</label>
      <select className={fieldClass} value={value} onChange={onChange} id={id}>
        {children}
      </select>
    </div>
  )
}
Select.displayName = 'Select'
export default Select
