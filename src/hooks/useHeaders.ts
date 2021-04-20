import { useMemo } from 'react'
import useUser from './user'

export default function useHeaders() {
  const user = useUser()
  const token = user.state.token
  const headers = useMemo(
    () => ({
      Authorization: `Token ` + token,
    }),
    [token]
  )
  return headers
}
