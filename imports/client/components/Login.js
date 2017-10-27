import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()

    Meteor.loginWithPassword({ email } , password, (err) => {
      if (err) {
        this.setState(() => ({ error: "unable to login.  check email and password" }))
      } else {
        this.setState(() => ({ error: '' }))
      }
    })
  }




  render() {
    return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>link app</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined }
        <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <button className="button">login</button>
        </form>

        <Link to="/signup">signup for an account?</Link>
      </div>
    </div>
    )
  }
}
