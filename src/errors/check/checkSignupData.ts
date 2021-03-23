export default function checkSignupData(
  username: string,
  email: string,
  password: string,
  passwordRe: string
) {
  let hasError = false
  let message = ''

  if (username === '') {
    message = 'Username is Required!'
    hasError = true
  }
  if (email === '') {
    message = 'Email is Required!'
    hasError = true
  }
  if (password === '') {
    message = 'Password is Required!'
    hasError = true
  }
  if (passwordRe === '') {
    message = 'Password Confirmation is Required!'
    hasError = true
  }
  let emailre = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailre.test(email)) {
    message = 'Email is Invalid!'
    hasError = true
  }
  if (password.length < 8) {
    message = "Password can't be less then 8!"
    hasError = true
  }
  if (password !== passwordRe) {
    message = "Password doesn't matches!"
    hasError = true
  }
  return { hasError, message }
}
