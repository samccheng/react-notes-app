import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Notes } from '../../api/notes'

import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmpty from './NoteListEmpty'

export const NoteList = (props) => {

  return (
    <div className="item-list">
      <NoteListHeader />
      { props.notes.length === 0 ? <NoteListEmpty /> : undefined }
      {props.notes.map((note) => {
            return <NoteListItem key={note._id} note={note}/>
          })
      }
    </div>
  )

}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes')

  return {
    notes: Notes.find({}, {sort: {
      updatedAt: -1
    }
  }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)
