import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import getHeaders from './getHeaders'

export default function useProfile() {
  const [state, setState] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const counter = useRef(0)

  useEffect(() => {
    setHasLoaded(false)
    var cancelHandler = axios.CancelToken.source()
    const headers = getHeaders()
    axios
      .get('https://at8-backend.herokuapp.com/rest-auth/user/', {
        headers,
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        if (counter.current >= 1) {
          setHasLoaded(true)
        }
        counter.current++
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
    axios
      .get('https://at8-backend.herokuapp.com/api/userprofile/', {
        headers: headers,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data[0])
          if (counter.current >= 1) {
            setHasLoaded(true)
          }
          counter.current++
        } else {
          setError('USER PROFILE NOT FOUND')
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
    return () => {
      cancelHandler.cancel()
    }
  }, [])
  return { state, profile, error, hasLoaded }
}
