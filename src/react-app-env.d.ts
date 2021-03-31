/// <reference types="react-scripts" />
/// <reference types="axios" />

interface UserState {
  token: null | string
  error: null | Error
  loading: boolean
}
interface Site {
  payement_details: string
  help_team_basic: string
  help_team_captain: string
  help_team_players: string
}
interface Games {
  id: number
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
  user: number
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
  id: number
  name: string
  details: string
  game: Games
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

interface Player {
  profile?: string
  url: string
  username: string
}

interface Teams {
  id: number
  user: number
  name: string
  slug: string
  logo: string
  captain: Captian
  team_captains_discord_tag: string
  registration_date: Date
  players: Array
}

interface Payment {
  tournament: number
  user: number
  team: number
  has_paid: boolean
  text_proof: string
  image_proof: string | any
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
