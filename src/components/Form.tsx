import React, { useState } from 'react'
import getFieldChild from '../func/getFieldChild'
import validateData from '../func/validateData'

import { Values } from '../func/valueType'

interface ValidatorData {
  required: boolean
  minLength: number
  maxLength: number
  equal: string
  regex: RegExp
}
export interface Validation {
  [key: string]: Partial<ValidatorData>
}

type onSubmit = (values: Values, e: React.FormEvent<HTMLFormElement>) => void
interface FormProps {
  formClass?: string
  submitClass?: string
  submitText?: string
  errorContainerClass?: string
  errorClass?: string
  initialValues: Values
  onSubmit?: onSubmit
  validate?: Validation
  disable?: boolean
  reset?: boolean
  resetClass?: string
  buttonsClass?: string
}

const Form: React.FC<FormProps> = ({
  initialValues,
  formClass = '',
  onSubmit,
  children,
  validate,
  submitText = 'Submit',
  submitClass = 'form-submit',
  resetClass = 'form-reset',
  reset,
  errorContainerClass = 'error-group',
  errorClass = 'form-error',
  buttonsClass = '',
  disable = false,
}) => {
  const [state, setState] = useState(initialValues)
  const [errors, setErrors] = useState<string[]>([])
  return (
    <form
      className={formClass}
      onSubmit={(e) => {
        e.preventDefault()
        if (onSubmit) {
          const { isValid, errors } = validateData(state, validate)
          if (isValid) {
            onSubmit(state, e)
            setErrors([])
          } else {
            setErrors(errors)
          }
        }
      }}
    >
      {getFieldChild(children, state, disable, (n, v) => {
        setState({ ...state, [n]: v })
      })}
      {errors.length > 0 && (
        <div className={errorContainerClass}>
          {errors.map((er, i) => (
            <div className={errorClass} key={i}>
              {er}
            </div>
          ))}
        </div>
      )}
      <div className={buttonsClass}>
        <button disabled={disable} type='submit' className={submitClass}>
          {submitText}
        </button>
        {reset && (
          <button
            disabled={disable}
            type='button'
            onClick={() => setState(initialValues)}
            className={resetClass}
          >
            Reset
          </button>
        )}
      </div>
    </form>
  )
}

export default Form
