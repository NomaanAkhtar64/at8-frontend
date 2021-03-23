export default function getHeaders() {
  const token = `Token ` + localStorage.getItem('token')
  const headers = {
    Authorization: token,
  }
  return headers
}
