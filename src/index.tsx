import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './hooks/user'

const app = (
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
