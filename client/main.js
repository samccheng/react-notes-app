import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import App, { onAuth, history} from '../imports/client/components/App'
import '../imports/startup/simple-schema-config.js'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuth(isAuthenticated)
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false)

  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')

  document.body.classList.toggle('menu', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDOM.render(<App />, document.getElementById('app'))
});
