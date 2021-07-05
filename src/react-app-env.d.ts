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

interface Cntx<S, A> {
  state: S
  action: A
}
type FieldTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'search'
  | 'reset'
  | 'submit'
  | 'tel'
  | 'text'
  | 'url'
  | 'week'

interface GameType {
  name: string
  required: boolean
  validation_regex?: string
  type: FieldTypes
  placeholder?: string
}

interface Game {
  id: number
  name: string
  picture: string
  slug: string
  type: GameType
  players_in_a_team: number
  alternate_players: number
}

interface WindowSize {
  height: number
  width: number
}

interface User {
  pk: number
  email: string
  username: string
  first_name: picstring
  last_name: string
  pk: number
}

interface UserProfile {
  id: number
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
  image: string
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
  upload_date: string
  stream_url_required: boolean
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
  url: string
  email?: string
  username: string
  is_alternate: boolean
  steam_username?: string
  steam_profile?: string
  country?: string
  city?: string
}

interface PI extends Player {
  index?: number
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
  stream_url: string
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
  transaction_id?: string
  date_transaction?: string
  time_transaction?: string
  image_proof?: string
  has_paid: boolean
  date: string
  user: number
}
interface Home {
  name: string
  video: string
}
interface LoginFields {
  email: string
  password: string
}
interface SignUpFields {
  username: string
  email: string
  password1: string
  password2: string
}
