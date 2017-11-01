import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export class NoteListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div onClick={() => {
        this.props.Session.set('selectedNoteId', this.props.note._id)
      }}>
        <h5>{this.props.note.title || 'Untitled note'}</h5>
        {this.props.note.selected ? 'selected' : undefined}
        <p>{ moment(this.props.note.updatedAt).format('M/DD/YY') }</p>
      </div>
    )
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return { Session }
}, NoteListItem)
