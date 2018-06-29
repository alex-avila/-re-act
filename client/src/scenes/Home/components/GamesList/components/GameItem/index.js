import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Button from '../../../../../../components/Button'

import './index.css'

class GameLink extends Component {
    render() {
        const { name, url, icon } = this.props
        let iconStyle = {
            background: `url(${icon})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: 60,
            width: 60,
            display: 'inline-block',
            borderRadius: 10
        }
        if (url === 'cardMatch') {
            iconStyle = {...iconStyle, border: '1px solid black'}
        }
        return (
            <div className="games__item">
                <Link to={url} className="item__info">
                    <span style={iconStyle}></span>
                    <span className="item__info__title">{name}</span>
                </Link>
                <Link to={`${url}/play`}>
                    <Button>Play</Button>
                </Link>
            </div>
        )
    }
}

export default GameLink