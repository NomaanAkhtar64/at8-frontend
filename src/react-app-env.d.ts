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
  steam_profile: string
}

interface Date {
  day: number
  month: number
  year: number
}

interface Tournament {
  name: string
  details: string
  game: {
    id: number
    name: string
    picture: string
    slug: string
  }
  slug: string
  slots: number
  prize: String
  starting_time: string
  ending_time: string
  winner: {
    logo: string
    name: string
    slug: string
    captain: {
      username: string
    }
  }
  registration_date: string
  teams: Array
}

interface Announcement {
  subject: string
  text: string
  image: string
  pk: number
  link: string
  date: Date
}

interface Captian {
  profile: string
  url: string
  username: string
}

interface Teams {
  email: string
  name: string
  slug: string
  logo: string
  captain: Captian
  team_captains_discord_tag: string
  payments: boolean
  registration_date: Date
  players: Array
  text_proof: string
  image_proof: string
  payment_details: string
}

interface Payment {
  tournament: number
  payment_details: string
}

interface FAQImage {
  caption: string
  image: string
}
interface FAQ {
  name: string
  details: string
  slug: string
  description: string
  images: FAQImage[]
}
