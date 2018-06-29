import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import './index.css'
import Button from '../../components/Button';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar__wrapper">
                <div className="navbar utility-wrapper">
                    <Link to="/"><div className="navbar__logo">LOGO</div></Link>
                    <Button basic>Login</Button>
                </div>
            </div>
        )
    }
}

export default Navbar