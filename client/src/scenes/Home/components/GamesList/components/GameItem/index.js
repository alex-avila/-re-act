import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import './index.css'

class GameLink extends Component {
    render() {
        const { name, url } = this.props
        return (
            <div className="games__item">
                <Link to={url} className="item__info">
                    {/* <span className="item__info__icon"></span> */}
                    <span className="item__info__title">{name}</span>
                </Link>
                <Link to={`${url}/play`}>
                    <button>Play</button>
                </Link>
            </div>
        );
    }
}

export default GameLink