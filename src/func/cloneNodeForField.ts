import React from 'react'
import { onValueUpdate, Values } from './valueType'
import { FieldProps } from '../components/Field'
const cloneNodeForField = (
  c: React.ReactNode,
  initialValues: Values,
  disable: boolean,
  onUpdate: onValueUpdate,
  i?: number
) => {
  if (React.isValidElement(c)) {
    if (typeof c.type !== 'string') {
      // @ts-ignore
      const name = c.type.displayName
      if (name === 'Field' || name === 'Select') {
        const onChange = (
          v: string | number,
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          onUpdate(c.props['name'], v)
        }

        let props: Partial<FieldProps & { key: number }> = {
          value: initialValues[c.props['name']],
          key: i,
          disable,
        }

        if (!('readOnly' in c.props)) {
          if ('onChange' in c.props) {
            props.onChange = c.props['onChange']
          } else {
            props.onChange = onChange
          }
        }

        return React.cloneElement(c, props)
      }
    }
  }
  return c
}

export default cloneNodeForField
