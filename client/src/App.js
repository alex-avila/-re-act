import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom"

import { connect } from 'react-redux'
import { getGames } from './redux/reducers/gamesReducer'

import Home from './scenes/Home'
import MemoryGame from './scenes/MemoryGame'
import TicTacToe from './scenes/TicTacToe/Game'
import BackButton from './components/BackButton'
import GameView from './scenes/GameView'
import Navbar from './components/Navbar';
import RPSLanding from './scenes/RockPaperScissors/RPSLanding';


class App extends Component {
	componentDidMount() {
		this.props.getGames()
	}

	render() {
		const pathArr = this.props.location.pathname.split('/')
		console.log()
		const { games } = this.props
		return (
			<div className="wrapper">

				{
					pathArr.includes('play') ?
						<Link to="/">
							<BackButton />
						</Link> :
						<Navbar />
				}

				<Switch>
					{/* Home */}
					<Route exact path="/" render={(props) => <Home games={games} {...props} />} />

					{/* All games share this as the details page */}
					<Route exact path="/:id" render={(props) => <GameView {...props} />} />

					{/* Games */}
					<Route path="/TicTacToe/play" component={TicTacToe} />
					<Route path="/cardMatch/play" component={MemoryGame} />
					{/* <Route path='/ColorGuess' Component={ColorGuess} /> */}
					<Route path='/RPS/play'  component={RPSLanding} />
				</Switch>

			</div>
		)
	}
}

export default withRouter(connect(state => ({ games: state.games }), { getGames })(App))