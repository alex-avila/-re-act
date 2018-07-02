import React, {Component} from "react";

export class Squares extends Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div 
            className="coloredSquare" 
            onClickCapture={this.props.squaresResult} 
            style={{backgroundColor: this.props.colors}}>
            </div>
        )
    }
}

export default Squares;