import axios, { AxiosResponse } from 'axios'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'

interface Context {
  isLogin: boolean
  loading: boolean
  state: {
    token: string | null
    user: User
    profile: UserProfile
  }
  actions: {
    login: (ld: LoginFields) => Promise<void>
    signup: (sd: SignUpFields) => Promise<void>
    logout: () => void
    editProfile: (v: Partial<UserProfile>) => Promise<void>
    editUser: (v: Partial<User>) => Promise<void>
  }
}
const UserContext = createContext<Context>(null)

type AllResponses = [AxiosResponse<User>, AxiosResponse<UserProfile[]>]
interface UserProviderProps {}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') === undefined
      ? null
      : localStorage.getItem('token')
  )
  const [user, setUser] = useState<User>(null)
  const [profile, setProfile] = useState<UserProfile>(null)
  const [loading, setLoading] = useState(false)

  const fetchUser = useCallback(
    (options) => {
      return new Promise((resolve, reject) => {
        const userURL = `${__API_URL__}/rest-auth/user/`
        const userRequest = axios.get<User>(userURL, options)

        const profileURL = `${__API_URL__}/api/userprofile/`
        const profileRequest = axios.get<UserProfile[]>(profileURL, options)

        const request = [userRequest, profileRequest]

        axios
          .all<AxiosResponse<User | UserProfile[]>>(request)
          .then(
            axios.spread((...responses: AllResponses) => {
              setUser(responses[0].data)
              setProfile(responses[1].data[0])
              setIsLogin(true)
              setLoading(false)
              resolve(123)
            })
          )
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    [setUser, setProfile, setIsLogin, setLoading]
  )

  const login = useCallback(
    (ld: LoginFields) => {
      setLoading(true)
      return axios
        .post<{ key: string }>(`${__API_URL__}/rest-auth/login/`, ld)
        .then(async (res) => {
          setToken(res.data.key)
          localStorage.setItem('token', res.data.key)

          const options = {
            headers: { Authorization: `Token ${res.data.key}` },
          }

          await fetchUser(options)
          return
        })
        .catch((err) => {
          setLoading(false)
          throw err
        })
    },
    [fetchUser, setLoading]
  )

  const logout = useCallback(() => {
    setToken(null)
    setIsLogin(false)
    setUser(null)
    setProfile(null)
    localStorage.removeItem('token')
  }, [])

  const signup = useCallback(
    (sd: SignUpFields) => {
      setLoading(true)
      return axios
        .post<{ key: string }>(`${__API_URL__}/rest-auth/registration/`, sd)
        .then(async (res) => {
          const token = res.data.key
          localStorage.setItem('token', token)
          setToken(res.data.key)
          const options = {
            headers: { Authorization: `Token ${res.data.key}` },
          }
          await fetchUser(options)
          setLoading(false)

          return
        })
        .catch((err) => {
          setLoading(false)
          throw err
        })
    },
    [fetchUser]
  )

  const editProfile = useCallback(
    (values: Partial<UserProfile>) => {
      const options = {
        headers: { Authorization: `Token ${token}` },
      }

      return axios
        .put(`${__API_URL__}/api/edit-profile/`, values, options)
        .then((res) => {
          setProfile({ ...profile, ...res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [token, profile]
  )

  const editUser = useCallback(
    (values: Partial<User>) => {
      const options = {
        headers: { Authorization: `Token ${token}` },
      }
      return axios
        .put(`${__API_URL__}/rest-auth/user/`, values, options)
        .then((res) => {
          setUser({ ...user, ...res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [token, user]
  )

  useEffect(() => {
    if (
      localStorage['token'] !== undefined &&
      user === null &&
      profile === null
    ) {
      const options = {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      }
      const getUser = async () => {
        setLoading(true)
        await fetchUser(options)
        setLoading(false)
      }
      getUser()
    }
  }, [fetchUser, user, profile])

  return (
    <UserContext.Provider
      value={{
        isLogin,
        actions: {
          login,
          logout,
          signup,
          editProfile,
          editUser,
        },
        loading,
        state: {
          profile,
          user,
          token,
        },
      }}
    >
      {token === null || user === null || profile === null ? (
        <Loading />
      ) : (
        children
      )}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)
export default useUser
