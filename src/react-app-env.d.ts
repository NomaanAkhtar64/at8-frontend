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

interface User {
  email: string
  username: string
  first_name: string
  last_name: string
  pk: number
}

interface UserProfile {
  user: string
  pic: string
  discord_name_tag: string
  tournament: string
}
interface Date {
  day: number
  month: number
  year: number
}
interface Tournament {
  name: string
  slug: string
  starting_date: Date
  ending_date: Date
  winner: {
    logo: string
    name: string
    slug: string
    captain: string
  }
}

interface Announcement {
  subject: string
  text: string
  image: string
  pk: number
}
