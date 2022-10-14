import React from 'react'
import { Link } from 'react-router-dom';
import './Layout.css'

function Layout(props) {
  return (
    <div className="wrapper">
        <div className='container'>
          <header className="header">
            <Link to='/' className='logo'>Article</Link>
          </header>
          {props.children}
          <footer className="footer">
            <Link to='/' className='logo'>Article</Link>
            <div></div>
          </footer>
        </div>
    </div>
  )
}

export default Layout