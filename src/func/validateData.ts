import { Validation } from '../components/Form'
import camelToWords from '../utils/camelToWords'
import { Values } from './valueType'

function validateData(value: Values, validate?: Validation) {
  let errors: string[] = []
  let isValid = true

  const setError = (msg: string) => {
    isValid = false
    errors.push(msg)
  }
  if (validate) {
    for (let c of Object.keys(validate)) {
      let fieldValue = value[c]
      let validatorData = validate[c]

      if (validatorData.equal) {
        if (value[c] !== value[validatorData.equal]) {
          setError(
            `${camelToWords(c)} and ${camelToWords(
              validatorData.equal
            )} do not match`
          )
        }
      }

      if (validatorData.maxLength && typeof fieldValue === 'string') {
        if (fieldValue.length > validatorData.maxLength) {
          setError(`${camelToWords(c)} is too large`)
        }
      }

      if (validatorData.minLength && typeof fieldValue === 'string') {
        if (fieldValue.length < validatorData.minLength) {
          setError(`${camelToWords(c)} is too small`)
        }
      }

      if (validatorData.regex && typeof fieldValue === 'string') {
        if (!validatorData.regex.test(fieldValue)) {
          setError(`${camelToWords(c)} format invalid`)
        }
      }

      if (validatorData.required && typeof fieldValue === 'string') {
        if (fieldValue === '') {
          setError(`${camelToWords(c)} is required!`)
        }
      }
    }
  }

  return { isValid, errors }
}

export default validateData
