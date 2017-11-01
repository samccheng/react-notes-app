import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { Session } from 'meteor/session'
import Signup from './Signup'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import Login from './Login'

const unAuthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

export const history = createHistory()

const onLoginPublicPage = () => (
  Meteor.userId() ? (<Dashboard />) : (<Login />)
)

const onSignUpPublicPage = () => (
  Meteor.userId() ? (<Dashboard />) : (<Signup />)
)

const onEnterPrivatePage = () => (
  !Meteor.userId() ? (<Signup />) : (<Dashboard />)
)

const onEnterNotePage = ({match}) => {
  if(!Meteor.userId()) {
    return (
      <Login />
    )
  } else {
    Session.set('selectedNoteId', match.params.id)
    return (
      <Dashboard />
    )
  }
}




export const onAuth = (isAuthenticated) => {
  const pathname = history.location.pathname
  const unAuthenticatedPage = unAuthenticatedPages.includes(pathname)
  const authenticatedPage = authenticatedPages.includes(pathname)

  if (unAuthenticatedPage && isAuthenticated) {
    history.push('/dashboard')
  } else if (authenticatedPage && !isAuthenticated) {
    history.push('/')
  }
  console.log('isAuthenticated', isAuthenticated)
}

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={onLoginPublicPage} />
          <Route path="/signup" render={onSignUpPublicPage} />
          <Route exact path="/dashboard" render={onEnterPrivatePage} />
          <Route path="/dashboard/:id" render={onEnterNotePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}


export default App
