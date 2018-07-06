import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { verify } from '../../redux/reducers/theAuthorator'

import './index.css'

class User extends Component {
    componentDidMount() {
        this.props.verify()
    }

    getScores = (scores) => {
        return scores.map((score, i) => {
            return <span key={score + i + i}>{score === null ? 0 : score}</span>
        })
    }

    render() {
        const { username, email, gravatar, scores } = this.props.player
        let gameScores = []
        if (scores) {
            for (let game in scores) {
                if (game === 'tic-tac-toe' && scores[game].length) {
                    gameScores.push(
                        <Fragment key={'tic'}>
                            <div className="user__game" >Tic Tac Toe:</div>
                            <div className="user__scores">{this.getScores(scores[game])}</div>
                        </Fragment>
                    )
                } else if (game === 'card-match' && scores[game].length) {
                    gameScores.push(
                        <Fragment key={'concentration'}>
                            <div className="user__game" >Concentration:</div>
                            <div className="user__scores">{this.getScores(scores[game])}</div>
                        </Fragment>
                    )
                } else if (game === 'color-guess' && scores[game].length) {
                    gameScores.push(
                        <Fragment key={'color'}>
                            <div className="user__game" >RGB Color:</div>
                            <div className="user__scores">{this.getScores(scores[game])}</div>
                        </Fragment>
                    )
                } else if (game === 'RPS' && scores[game].length) {
                    gameScores.push(
                        <Fragment key={'rps'}>
                            <div className="user__game" >Elements 2000:</div>
                            <div className="user__scores">{this.getScores(scores[game])}</div>
                        </Fragment>
                    )
                }
            }
        }
        return (
            <div className="utility-wrapper">
                <div className="user-info">
                    <img src={gravatar} alt="Profile" />
                    <div>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                    </div>
                </div>
                <div className="scores-list">
                    <h3>Scores</h3>
                    {gameScores}
                </div>
            </div>
        )
    }
}

export default connect(state => ({ player: state.player }), { verify })(User)