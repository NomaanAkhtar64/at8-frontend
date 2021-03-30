import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'

import App from './App'
import reducer from './store/reducers/auth'
import { BrowserRouter } from 'react-router-dom'

// const composeEnhancers = window[
//     "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
// ] as typeof compose;

const store = createStore(reducer, compose(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
