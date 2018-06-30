import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Button from '../../components/Button'

import logoMaybe from '../../icons/logo-maybe.svg'

import './index.css'

class Navbar extends Component {
    render() {
        const logoStyle = {
            background: `url(${logoMaybe})`,
            backgroundSize: 'contain',
            height: 45,
            width: 45
        }
        return (
            <div className="navbar__wrapper">
                <div className="navbar utility-wrapper">
                    <Link to="/" className="navbar__logo">
                        <span style={logoStyle} className="logo__icon"></span>
                        <span className="logo__text">H01</span>
                    </Link>
                    <Button basic>Login</Button>
                </div>
            </div>
        )
    }
}

export default Navbar