import React from 'react'
import {Link} from "react-router-dom";
import {node} from 'prop-types'
import './Navbar.css'
import logo from '../assets/logo.png'

const Navbar = (props) => {
  return (
    <nav className='Navbar Navbar--sticky'>
      <Link to='/'>
        <img src={logo} className='Navbar__logo' alt='logo' />
      </Link>
      {props.section &&
        <span className='Navbar__section' data-testid="navbar-section">{props.section}</span>
      }
    </nav>
  )
};

Navbar.propTypes = {
  section: node
};

export default Navbar