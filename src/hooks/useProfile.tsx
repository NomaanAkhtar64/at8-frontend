import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

export default function useProfile() {
  const [state, setState] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const counter = useRef(0)
  // console.log(state, profile);

  useEffect(() => {
    setHasLoaded(false)
    const token = `Token ` + localStorage.getItem('token')
    const headers = {
      Authorization: token,
    }
    var cancelHandler = axios.CancelToken.source()
    axios
      .get('https://at8-backend.herokuapp.com/rest-auth/user/', {
        headers: headers,
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
        setProfile(res.data)
        if (counter.current >= 1) {
          setHasLoaded(true)
        }
        counter.current++
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
