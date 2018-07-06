import React, {Component} from "react";

export class Squares extends Component {
    render(){
        return(
            <div 
            className="coloredSquare" 
            onClick={this.props.squaresResult} 
            style={{backgroundColor: this.props.colors}}>
            </div>
        )
    }
}

export default Squares;