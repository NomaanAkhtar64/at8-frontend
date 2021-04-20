import axios, { AxiosResponse } from 'axios'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'
import useHeaders from './useHeaders'
import useUser from './user'

interface Actions {
  create: (t: Team) => Promise<Team | void>
  delete: (id: number) => Promise<void>
  edit: (t: Partial<Team>) => Promise<void>
}
const TeamsContext = createContext<Cntx<Team[], Actions>>(null)

const useTeams = () => useContext(TeamsContext)
export default useTeams

interface TeamProviderProps {}
export const TeamsProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [state, setState] = useState<Team[]>([])

  const headers = useHeaders()
  const user = useUser()

  const isLogin = user.isLogin
  const userId = isLogin && user.state.user.pk
  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    if (isLogin)
      axios
        .get(`${__API_URL__}/api/teams/?user=${userId}`, {
          cancelToken: cancelHandler.token,
          headers,
        })
        .then((res) => {
          setState(res.data)
          localStorage.setItem('team-list', JSON.stringify(res.data))
          setHasLoaded(true)
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('TEAMS REQUEST CANCELLED')
          } else {
            console.log(err)
            // setError(err)
          }
        })

    return () => {
      if (isLogin) cancelHandler.cancel()
    }
  }, [isLogin, userId, headers])

  const createTeam = useCallback(
    (t: Team) => {
      return axios
        .post<Team>(`${__API_URL__}/api/teams/`, t, {
          headers,
        })
        .then((res) => {
          setState([...state, res.data])
          return res.data
        })
        .catch((err) => console.log(err))
    },
    [state, headers]
  )

  const deleteTeam = useCallback(
    (id: number) => {
      return axios
        .delete(`${__API_URL__}/api/teams/${id}/`, { headers })
        .then((res) => {
          setState([...state.filter((s) => s.id !== id)])
        })
        .catch((err) => console.log(err))
    },
    [state, headers]
  )
  const editTeam = useCallback(
    (values: Partial<Team>) => {
      return axios
        .patch(`${__API_URL__}/api/teams/${values.id}/`, values, { headers })
        .then((res: AxiosResponse<Team>) => {
          setState([
            ...state.filter((s) => s.id !== values.id),
            { ...state.find((st) => st.id === values.id), ...res.data },
          ])
          return
        })
        .catch((err) => {
          console.log(err)
          return
        })
    },
    [state, headers]
  )
  return (
    <TeamsContext.Provider
      value={{
        action: {
          create: createTeam,
          delete: deleteTeam,
          edit: editTeam,
        },
        state,
      }}
    >
      {user.isLogin ? hasLoaded ? children : <Loading /> : children}
    </TeamsContext.Provider>
  )
}
