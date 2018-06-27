import React, { Component } from 'react';

import backIcon from '../../icons/arrow-back.svg'
// import backIconAlt from '../../icons/arrow-back-alt.svg'

import './index.css'

class BackButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dimmed: false,
        }
        this.timeout = null
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        let buttonClasses = 'important-back-button'
        this.timeout = setTimeout(() => {
            this.setState({ dimmed: true })
        }, 1000)
        if (this.state.dimmed) {
            buttonClasses = 'important-back-button dimmed'
        }
        const backIconStyles = {
            display: 'block',
            background: `url(${backIcon})`,
            backgroundSize: 'contain',
            height: 40,
            width: 30,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
        return (
            <button className={buttonClasses}>
                <span style={backIconStyles}></span>
            </button>
        )
    }
}

export default BackButton;