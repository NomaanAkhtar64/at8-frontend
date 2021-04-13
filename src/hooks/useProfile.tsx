import axios from 'axios'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'
import { connect } from 'react-redux'

const ProfileContext = createContext<{
  state: User
  profile: UserProfile
}>(null)

const Provider: React.FC<{ isAuthenticated: boolean }> = ({
  children,
  isAuthenticated,
}) => {
  const [state, setState] = useState<User>(null)
  const [profile, setProfile] = useState<UserProfile>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const counter = useRef(0)
  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    if (isAuthenticated) {
      setHasLoaded(false)
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
            console.log('USER PROFILE NOT FOUND')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return () => {
      cancelHandler.cancel()
    }
  }, [isAuthenticated])

  return (
    <ProfileContext.Provider
      value={{
        state,
        profile,
      }}
    >
      {hasLoaded || !isAuthenticated ? children : <Loading />}
    </ProfileContext.Provider>
  )
}
const mapStateToProps = (state: UserState) => {
  return {
    isAuthenticated: state.token !== null,
  }
}
const ProfileProvider = connect(mapStateToProps)(Provider)

const useProfile = () => useContext(ProfileContext)

export default useProfile
export { ProfileProvider }
