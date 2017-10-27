import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>404 not found</h1>
      <p>unable to find the page</p>
      <Link to="/" className="button button--link">home</Link>
    </div>
  </div>
)
