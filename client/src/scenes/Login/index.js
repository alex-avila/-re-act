import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loginStuff } from '../../redux/reducers/theAuthorator'

import Button from '../../components/Button'

import './index.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                userName: '',
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
        this.props.loginStuff(this.state.inputs)
    }

    render() {
        return (
            <div className="login__wrapper">
                <h2>Log In</h2>
                <form onSubmit={this.handleSubmit} className="login__form">
                    <div className="login__form__inputs">
                        <label name="userName" >
                            <span>Username or email</span>
                            <input 
                                type="text" 
                                name="userName" 
                                onChange={this.handleChange} 
                                value={this.state.inputs.userName}
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

export default connect(null, { loginStuff })(Login)