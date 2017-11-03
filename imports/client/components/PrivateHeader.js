import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const PrivatHeader = (props) => {
  const navImageSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg"

  return (
    <div className="header">
      <div className="header__content">
        <img src={navImageSrc}
          onClick={() => Session.set('isNavOpen', !props.isNavOpen)}
          className="header__nav-toggle"
        />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--header" onClick={() => props.handleLogout()}>logout</button>
      </div>
    </div>
  )
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivatHeader)
