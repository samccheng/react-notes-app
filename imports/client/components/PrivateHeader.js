import React from 'react'
import { Accounts } from 'meteor/accounts-base'

const PrivatHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--header" onClick={() => Accounts.logout()}>logout</button>
      </div>
    </div>
  )
}

export default PrivatHeader
