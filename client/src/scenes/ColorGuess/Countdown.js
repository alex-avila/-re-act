import React from "react";
import ReactCountdownClock from "react-countdown-clock";

const Countdown = props => {
    return(
        <div id="countdown" style={{backgroundColor: '#36424E'}}>
            <ReactCountdownClock seconds={30}
                color="white"
                alpha={6.0}
                size={100}
                onComplete={props.timesUp} 
            />
        </div>
    )
}

export default Countdown;