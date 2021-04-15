import React, { useMemo } from 'react'
import camelToWords from '../utils/camelToWords'
let fieldCount = 0
type FieldTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'search'
  | 'reset'
  | 'submit'
  | 'tel'
  | 'text'
  | 'url'
  | 'week'

export interface FieldProps {
  label?: string
  type: FieldTypes
  value?: JSX.IntrinsicElements['input']['value']
  containerClass?: string
  fieldClass?: string
  name: string
  inputRegex?: RegExp
  onChange?: (
    v: string | number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  placeholder?: boolean
  disable?: boolean
  readOnly?: boolean
}

const Field: React.FC<FieldProps> = ({
  label,
  type,
  value = '',
  containerClass = 'form-group',
  fieldClass = 'form-control',
  onChange,
  name,
  children,
  inputRegex,
  placeholder = false,
  disable = false,
  readOnly = false,
}) => {
  const id = useMemo(() => `${name.toLowerCase()}-${fieldCount++}`, [name])
  return (
    <div className={containerClass}>
      {!placeholder && (
        <label htmlFor={id}>{label ? label : camelToWords(name)}</label>
      )}
      <input
        className={fieldClass}
        onChange={(e) => {
          let v = e.target.value
          if (inputRegex) {
            v = v.replace(inputRegex, '')
          }
          if (onChange) {
            onChange(v, e)
          }
        }}
        type={type}
        id={id}
        value={value !== null ? value : ''}
        disabled={disable}
        placeholder={placeholder ? (label ? label : camelToWords(name)) : ''}
        readOnly={readOnly}
      />
      {children && children}
    </div>
  )
}
Field.displayName = 'Field'

export default Field
