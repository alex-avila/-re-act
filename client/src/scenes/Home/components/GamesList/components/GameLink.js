import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Button from '../../../../../components/Button'

import './GameLink.css'

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
            boxShadow: '0 3px 6px #362555',
            borderRadius: 4
        }
        if (url === 'card-match') {
            iconStyle = { ...iconStyle, border: '1px solid #484848' }
        }
        return (
            <div className="games__item">
                <Link to={url} className="item__info">
                    <span style={iconStyle}></span>
                    <div className="item__info__text">
                        <span className="item__info__title">{name}</span>
                        {/* <span className="item__info__addtl-info">sample text</span> */}
                    </div>
                </Link>
                <Link to={`${url}/play`}>
                    <Button>Play</Button>
                </Link>
            </div>
        )
    }
}

export default GameLink