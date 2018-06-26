import React, { Component } from 'react';

class WinModal extends Component {
    render() {
        return (
            <div id="modal">
                <div className="modal__content">
                    <h3>YOU WIN</h3>
                    <p>You won in <span id="time-result"></span> with <span id="star-result"></span> stars</p>
                    <button id="play-again">PLAY AGAIN</button>
                </div>
            </div>
        );
    }
}

export default WinModal;