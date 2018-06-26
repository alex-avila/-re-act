import React, { Component } from 'react';

class GameMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Instead of filled, put something else
            // that makes more sense with the logic
            star1: 'filled',
            star2: 'filled',
            star3: 'filled',
        }
    }

    getStarStyle = starIcon => {
        return {
            backgroundImage: `url(${starIcon})`,
            backgroundSize: 'contain',
            height: 20,
            width: 20,
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }
    }

    render() {
        const { arrowIcon, emptyStarIcon, filledStarIcon, refreshIcon } = this.props
        const refreshIconStyle = {
            backgroundImage: `url(${refreshIcon})`,
            backgroundSize: 'contain',
            height: 24,
            width: 24,
            cursor: 'pointer'
        }
        const star1Style = this.getStarStyle(filledStarIcon)
        const star2Style = this.getStarStyle(filledStarIcon)
        const star3Style = this.getStarStyle(filledStarIcon)
        return (
            <div className="game__menu">
                <span style={refreshIconStyle} className="reset-icon" id="reset-btn"></span>
                <span id="timer"></span>
                <div className="game__stats">
                    <span id="stats__moves"></span>
                    <span className="stats__stars">
                        <span style={star1Style} className="star filled-star" id="star1"></span>
                        <span style={star2Style} className="star" id="star2"></span>
                        <span style={star3Style} className="star" id="star3"></span>
                    </span>
                </div>
            </div>
        );
    }
}

export default GameMenu;