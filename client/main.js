import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Tracker } from 'meteor/tracker'
import App, { onAuth } from '../imports/client/components/App'
import '../imports/startup/simple-schema-config.js'


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuth(isAuthenticated)
})


Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'))
});
