import React, { Component } from 'react'

import { connect } from 'react-redux'
import { login } from '../../redux/reducers/theAuthorator'

import Button from '../../components/Button'

import './index.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                username: '',
                password: ''
            }
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.inputs)
    }

    render() {
        return (
            <div className="login__wrapper">
                <h2>Log In</h2>
                <form onSubmit={this.handleSubmit} className="login__form">
                    <div className="login__form__inputs">
                        <label name="usename" >
                            <span>Username or email</span>
                            <input 
                                type="text" 
                                name="username" 
                                onChange={this.handleChange} 
                                value={this.state.inputs.username}
                                autoComplete="off"
                            />
                        </label>
                        <label name="password" >
                            <span>Password</span>
                            <input 
                                type="text" 
                                name="password" 
                                onChange={this.handleChange} 
                                value={this.state.inputs.password}
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    <Button>Log In</Button>
                </form>
            </div>
        )
    }
}

export default connect(null, { login })(Login)