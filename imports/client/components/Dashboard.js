import React from 'react'
import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'
import Editor from './Editor'

export default () => {
  return (
    <div>
      <PrivateHeader title="dashboard" />
      <div className="wrapper">
        <div className="wrapper__sidebar"><NoteList /></div>
        <div className="wrapper__main"><Editor /></div>
      </div>
    </div>
  )
}
