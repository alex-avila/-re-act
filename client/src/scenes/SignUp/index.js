import React, { Component } from 'react'

import Button from '../../components/Button'

import './index.css'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                username: '',
                email: '',
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
    }

    render() {
        return (
            <div className="signup__wrapper">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} className="signup__form">
                    <div className="signup__form__inputs">
                        <label name="username" >
                            <span>Username</span>
                            <input 
                                type="text" 
                                name="username" 
                                onChange={this.handleChange} 
                                value={this.state.inputs.username}
                                autoComplete="off"
                            />
                        </label>
                        <label name="email" >
                            <span>Email</span>
                            <input 
                                type="text" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={this.state.inputs.email}
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
                    <Button>Sign Up</Button>
                </form>
            </div>
        )
    }
}

export default SignUp