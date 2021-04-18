import React from 'react'

interface FormErrorProps {
  errorContainerClass?: string
  errorClass?: string
  errors: string[]
}

const FormError: React.FC<FormErrorProps> = ({
  errorContainerClass = 'error-group',
  errorClass = 'form-error',
  errors,
}) => {
  if (errors.length > 0)
    return (
      <div className={errorContainerClass}>
        {errors.map((er, i) => (
          <div className={errorClass} key={i}>
            {er}
          </div>
        ))}
      </div>
    )

  return null
}

export default FormError
