export default function checkPasswordChangeData(
  password: string,
  passwordConfirm: string
) {
  let hasError = false
  let message = ''

  if (password.length < 8) {
    message = 'Password must be atleast 8 characters long!'
    hasError = true
  }
  if (password !== passwordConfirm) {
    console.log(true)
    message = 'Password does not match!'
    hasError = true
  }
  return { hasError, message }
}
