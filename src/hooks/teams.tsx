import axios from 'axios'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Loading from '../components/Loading'
import { __API_URL__ } from '../const'
import getHeaders from './getHeaders'
import useUser from './user'

interface Actions {
  create: (t: Team) => Promise<Team | void>
  delete: (id: number) => Promise<void>
}
const TeamsContext = createContext<Cntx<Team[], Actions>>(null)

const useTeams = () => useContext(TeamsContext)
export default useTeams

interface TeamProviderProps {}
export const TeamsProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [state, setState] = useState<Team[]>([])
  // const [errors, setErrors] = useState<string[]>([])
  const headers = useMemo(() => getHeaders(), [])

  const user = useUser()

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()

    axios
      .get(`${__API_URL__}/api/teams/?user=${user.state.user.pk}`, {
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
      cancelHandler.cancel()
    }
  }, [user, headers])

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
          setState(state.filter((s) => s.id !== id))
        })
        .catch((err) => console.log(err))
    },
    [state, headers]
  )

  return (
    <TeamsContext.Provider
      value={{
        action: {
          create: createTeam,
          delete: deleteTeam,
        },
        state,
      }}
    >
      {hasLoaded ? children : <Loading />}
    </TeamsContext.Provider>
  )
}
// export default function useTeams(user: number) {
//   const teamStorage = useMemo(() => user && localStorage.getItem('team-list'), [
//     user,
//   ])
//   const [state, setState] = useState<Team[]>(
//     teamStorage ? JSON.parse(teamStorage) : []
//   )
//   const [error, setError] = useState('')
//   const [hasLoaded, setHasLoaded] = useState(teamStorage ? true : false)

//   useEffect(() => {
//     var cancelHandler = axios.CancelToken.source()

//     axios
//       .get(`${__API_URL__}/api/teams/?user=${user}`, {
//         cancelToken: cancelHandler.token,
//       })
//       .then((res) => {
//         setState(res.data)
//         localStorage.setItem('team-list', JSON.stringify(res.data))
//         setHasLoaded(true)
//       })
//       .catch((err) => {
//         if (axios.isCancel(err)) {
//           console.log('TEAMS REQUEST CANCELLED')
//         } else {
//           console.log(err)
//           setError(err)
//         }
//       })

//     return () => {
//       cancelHandler.cancel()
//     }
//   }, [user])

//   return { state, error, hasLoaded }
// }
