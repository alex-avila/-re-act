import React, { Component } from 'react'

import { connect } from 'react-redux'

class User extends Component {
    render() {
        const { username, email, gravatar } = this.props.player
        return (
            <div className="utility-wrapper">
                <img src={gravatar} alt="Profile"/>
                <h1>{username}</h1>
                <p>Email: {email}</p>
            </div>
        )
    }
}

export default connect(state => ({player: state.player}), {})(User)