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
