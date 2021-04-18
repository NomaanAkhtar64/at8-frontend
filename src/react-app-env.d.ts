/// <reference types="react-scripts" />
/// <reference types="axios" />

interface UserState {
  token: null | string
  error: null | Error | AxiosError
  loading: boolean
}
interface Site {
  payment_details: string
  help_team_basic: string
  help_team_captain: string
  help_team_players: string
  help_team_existing: string
}
interface Game {
  id: number
  name: string
  picture: string
  slug: string
  type: 'steam-game' | 'valorant' | 'pubg'
}

interface WindowSize {
  height: number
  width: number
}

interface User {
  email: string
  username: string
  first_name: picstring
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
  game: Game
  slug: string
  has_free_slot: boolean
  prize: String
  starting_time: string
  total_slots: number
  occupied_slots: number
  ending_time: string
  winner: {
    logo: string
    name: string
    slug: string
    captain: {
      username: string
    }
  }
  fee: number
  registration_date: string
  hasFee: boolean
  teams: Teams[]
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

interface Team {
  id?: number
  user: number
  name: string
  slug?: string
  logo: string | any
  captain: Player
  team_captains_discord_tag: string
  registration_date?: Date
  game?: number
  players: Player[]
}

// interface Payment {
//   tournament: number
//   user: number
//   team: number
//   has_paid: boolean
//   text_proof: string
//   image_proof: string | any
// }

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

interface Entry {
  id?: number
  entry_id?: number
  tournament: number
  team: number
  user: number
  transaction_id?: string
  date_transaction?: string
  time_transaction?: string
  image_proof?: string
  has_paid?: boolean
  date?: string
}
interface EntryDetail {
  id?: number
  entry_id: number
  tournament: Tournament
  team: Teams
  text_proof?: string
  image_proof?: string
  has_paid: boolean
  date: string
}
interface Home {
  name: string
  video: string
}
interface PI extends Player {
  index?: number
}
