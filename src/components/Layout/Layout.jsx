import React from 'react'
import { Link } from 'react-router-dom';
import './Layout.css'

function Layout(props) {
  return (
    <div className="wrapper">
        <header className="header">
          <Link to='/'>Article</Link>
        </header>
        {props.children}
    </div>
  )
}

export default Layout