import React, { lazy, Suspense, useEffect } from 'react'
import { Route, useLocation } from 'react-router'
import { connect } from 'react-redux'

import Layout from './layout/Layout'
import * as actions from './store/actions/auth'
import LoadingBar from './components/LoadingBar'
import Profile from './screens/Profile'
import Redirecter from './screens/Redirecter'
import './BootStrapOverrides.scss'
import { AxiosError } from 'axios'

const Home = lazy(() => import('./screens/Home'))
const Account = lazy(() => import('./screens/Account'))
const Announcements = lazy(() => import('./screens/Announcements'))
const Games = lazy(() => import('./screens/Games'))
const FAQArticle = lazy(() => import('./screens/FAQArticle'))
const FAQ = lazy(() => import('./screens/FAQ'))
const Tournament = lazy(() => import('./screens/Tournament'))
const ResetPassword = lazy(() => import('./screens/ResetPassword'))
const ResetPasswordConfirm = lazy(
  () => import('./screens/ResetPasswordConfirm')
)
const EnterTournament = lazy(() => import('./screens/EnterTournament'))

interface AppProps {
  onTryAutoSignup: () => void
  isAuthenticated: boolean
  clearServerError: () => void
  serverError: AxiosError<{ non_field_error: string }> | null
}

const App: React.FC<AppProps> = ({
  onTryAutoSignup,
  isAuthenticated,
  clearServerError,
  serverError,
}) => {
  const location = useLocation<{ clearError?: boolean }>()
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])
  useEffect(() => {
    if (serverError && location.pathname !== '/login') {
      clearServerError()
    }
  }, [location, serverError, clearServerError])
  return (
    <Layout>
      <Suspense fallback={<LoadingBar />}>
        <Route exact path='/' component={Home} />
        {!isAuthenticated && (
          <>
            <Route exact path='/signup' component={Account} />
            <Route exact path='/login' component={Account} />
          </>
        )}
        <Route exact path='/games' component={Games} />
        <Route exact path='/announcements' component={Announcements} />
        <Route
          exact
          path='/profile'
          component={isAuthenticated ? Profile : Redirecter}
        />
        <Route exact path='/tournament/:slug' component={Tournament} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route
          exact
          path='/reset/password/confirm/:token/'
          component={ResetPasswordConfirm}
        />
        <Route
          exact
          path='/register/'
          component={isAuthenticated ? EnterTournament : Redirecter}
        />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/faq/:slug' component={FAQArticle} />
        <Route exact path='/signup/confirm' component={Account} />
      </Suspense>
    </Layout>
  )
}

const mapStateToProps = (state: UserState) => {
  return {
    isAuthenticated: state.token !== null,
    serverError: state.error,
  }
}

const mapDispatchToProps = (dispatchEvent) => {
  return {
    onTryAutoSignup: () => dispatchEvent(actions.authCheckState()),
    clearServerError: () => dispatchEvent(actions.authClearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
