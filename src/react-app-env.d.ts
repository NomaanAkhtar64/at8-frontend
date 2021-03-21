/// <reference types="react-scripts" />
/// <reference types="axios" />

interface UserState {
  token: null | string
  error: null | Error
  loading: boolean
}

interface Games {
  name: string
  picture: string
  slug: string
}

interface WindowSize {
  height: number
  width: number
}

interface RestProfile {
  email: string
  username: string
  first_name: string
  last_name: string
  pk: number
}

interface ApiProfile {
  user: string
  pic: string
  discord_name_tag: string
  tournament: string
}