import React from 'react'
import { onValueUpdate, Values } from './valueType'

const cloneNodeForField = (
  c: React.ReactNode,
  initialValues: Values,
  disable: boolean,
  onUpdate: onValueUpdate,
  i?: number
) => {
  if (React.isValidElement(c)) {
    if (typeof c.type !== 'string') {
      const name = c.type.name
      if (name === 'Field' || name === 'Select') {
        const onChange = (
          v: string | number,
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          onUpdate(c.props['name'], v)
        }
        return React.cloneElement(c, {
          value: initialValues[c.props['name']],
          onChange:
            !c.props['readOnly'] &&
            (c.props['onChange']
              ? (c.props['onChange'] as typeof onChange)
              : onChange),
          key: i,
          disabled: disable,
        })
      }
    }
  }
  return c
}

export default cloneNodeForField
