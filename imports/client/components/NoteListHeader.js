import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {props.meteorCall('notes.insert')}}>new note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader)
