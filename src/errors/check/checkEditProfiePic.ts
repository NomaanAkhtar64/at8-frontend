export default function checkEditProfilePic(pic: File | null) {
  let isValid = true
  let message = ''

  if (!pic) {
    isValid = false
    message = 'pic is required'
  }
  return { isValid, message }
}
