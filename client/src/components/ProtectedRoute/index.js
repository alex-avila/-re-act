import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
    render() {
        const { isAuthenticated, path, component: Component } = this.props
        return (
            isAuthenticated ?
                <Route path={path} component={Component} /> :
                <Redirect to="/" />
        )
    }
}

export default connect(state => state.player, {})(ProtectedRoute)