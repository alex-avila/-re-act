import React, {Component} from "react";

class FinishedGame extends Component {
    render(){
        return(
            <div style={{backgroundColor: '#36424E'}}>
                {this.props.finished ? <div id="popUpWindow">
                    <div id="finishedWindow">
                        <h2>You got {this.props.score} correct!</h2>
                        <button onClick={this.props.startAgain}>Play Again?</button>
                        <button>Home Page</button>
                    </div>
                    </div>: null}
            </div>
        )
    }
}

export default FinishedGame;