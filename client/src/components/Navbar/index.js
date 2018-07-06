import React, { Component } from 'react'

import { connect } from 'react-redux'
import { logout } from '../../redux/reducers/theAuthorator'

import { Link } from 'react-router-dom'
import Button from '../../components/Button'

import logoMaybe from '../../icons/logo-maybe.svg'

import './index.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDropdownOn: false
        }
    }

    handleLogout = () => {
        this.props.logout()
    }

    handleToggleDropdown = e => {
        if (e.target.id === 'dropdown') {
            this.setState(prevState => ({
                isDropdownOn: !prevState.isDropdownOn
            }))
        } else {
            this.setState(prevState => ({
                isDropdownOn: false
            }))
        }
    }

    render() {
        const { isAuthenticated, gravatar } = this.props.player
        const logoStyle = {
            background: `url(${logoMaybe})`,
            backgroundSize: 'contain',
            height: 45,
            width: 45
        }
        return (
            <div className="navbar__wrapper" onClick={this.handleToggleDropdown}>
                <div className="navbar utility-wrapper">
                    <Link to="/" className="navbar__logo">
                        <span style={logoStyle} className="logo__icon"></span>
                        <span className="logo__text">H0i</span>
                    </Link>
                    {
                        // if user is logged in 
                        isAuthenticated ?
                            <div className="navbar__user">
                                <img id="dropdown" width="40px" height="40px" src={`${gravatar}`} alt="Player." />
                                <div
                                    className={`navbar__user__dropdown ${this.state.isDropdownOn ? 'dropped' : ''}`}
                                    >
                                    <Link to="/user">
                                        <Button basic>Profile</Button>
                                    </Link>
                                    <Button basic onClick={this.handleLogout}>Logout</Button>
                                </div>
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

export default connect(state => ({ player: state.player }), { logout })(Navbar)