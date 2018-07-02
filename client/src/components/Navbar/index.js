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
                        <span className="logo__text">H0i</span>
                    </Link>
                    {
                        // if user is logged in 
                        false ?
                            <div>
                                <Link to="/user">
                                    <span>User</span>
                                </Link>
                            </div> :
                            <div className="navbar__auth">
                                <Link to="/login">
                                    <Button basic>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button>Sign Up</Button>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default Navbar