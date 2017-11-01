import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import PropTypes from 'prop-types'

import { Notes } from '../../api/notes'

export class Editor extends React.Component {
  render() {
    if(this.props.note) {
      return (
        <div>{this.props.note._id}</div>
      )
    } else {
      return (
        <p>{this.props.selectedNoteId ? "no note found" : "pick or create a note"}</p>
      )
    }
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  }
}, Editor)
