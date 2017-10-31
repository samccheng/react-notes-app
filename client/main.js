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

  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  ReactDOM.render(<App />, document.getElementById('app'))
});
