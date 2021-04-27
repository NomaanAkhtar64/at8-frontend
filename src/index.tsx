import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './hooks/user'
import { GamesProvider } from './hooks/games'

const app = (
  <BrowserRouter>
    <UserProvider>
      <GamesProvider>
        <App />
      </GamesProvider>
    </UserProvider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
