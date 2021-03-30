import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'

export default function useProfile() {
  const [state, setState] = useState<User>(null)
  const [profile, setProfile] = useState<UserProfile>(null)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const counter = useRef(0)

  useEffect(() => {
    setHasLoaded(false)
    var cancelHandler = axios.CancelToken.source()
    const headers = getHeaders()
    axios
      .get(`${__API_URL__}/rest-auth/user/`, {
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
      .get(`${__API_URL__}/api/userprofile/`, {
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
