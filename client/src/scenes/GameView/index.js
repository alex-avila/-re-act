import React, { Component } from 'react';

class GameView extends Component {
    componentDidMount() {
        // Go to redux or whatever and get the data to display this page.
    }

    render() {
        return (
            <div>
                <div>Game data goes here</div>
                <div>{this.props.match.params.id}</div>
                <div>
                    {/* Image */}
                </div>
                <div>
                    {/* Title */}
                </div>
                <div>
                    {/* Link to play */}
                </div>
                <div>
                    {/* Description/Article */}
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default GameView;