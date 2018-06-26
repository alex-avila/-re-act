import React, { Component } from 'react'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gridShuffled: []
        }
    }

    componentDidMount() {
        this.generateCards()
    }

    handleFlip = e => {
        console.log(e.target)
    }

    generateCards = () => {
        const icons = [
            'ra-pills',
            'ra-fox',
            'ra-toast',
            'ra-gamepad-cross',
            'ra-pisces',
            'ra-perspective-dice-one',
            'ra-skull',
            'ra-acid'
        ];
        let html = []
        let iconsArr = [...icons]

        for (let i = 0; i < 16; i++) {
            const randIndex = Math.floor(Math.random() * iconsArr.length)
            const selection = iconsArr.splice(randIndex, 1)
            iconsArr = i === 7 ? [...icons] : iconsArr
            html.push(
                <div key={selection + i} className="card" data-name={selection} onClick={this.handleFlip}>
                    <div className="card__side card__back"></div>
                    <div className={`ra ${selection} card__side card__front`}></div>
                </div>
            )
        }

        this.setState({ gridShuffled: html })
    }

    render() {
        return (
            <div className="grid__container">
                <section id="grid">
                    {this.state.gridShuffled}
                </section>
            </div>
        )
    }
}

export default index