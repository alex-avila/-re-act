import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom"

import { connect } from 'react-redux'
import { getGames } from './redux/reducers/gamesReducer'

import Home from './scenes/Home'
import MemoryGame from './scenes/MemoryGame'
import TicTacToe from './scenes/TicTacToe/Game'
import BackButton from './components/BackButton'
import GameView from './scenes/GameView'


class App extends Component {
	componentDidMount() {
		this.props.getGames()
	}

	render() {
		const { games } = this.props
		return (
			<div className="wrapper">

				{
					this.props.location.pathname !== '/' &&
					<Link to="/">
						<BackButton />
					</Link>
				}

				<Switch>
					{/* Home */}
					<Route exact path="/" render={(props) => <Home games={games} {...props} />} />

					{/* All games share this as the details page */}
					<Route exact path="/:id" component={GameView} />

					{/* Games */}
					<Route path="/TicTacToe/play" component={TicTacToe} />
					<Route path="/cardMatch/play" component={MemoryGame} />
					{/* <Route path='/ColorGuess' Component={ColorGuess} /> */}
					{/* <Route path='=RPS'  Component={RPS} */}
				</Switch>

			</div>
		)
	}
}

export default withRouter(connect(state => ({ games: state.games }), { getGames })(App))