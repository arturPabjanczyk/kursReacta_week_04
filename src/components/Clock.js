import React from "react";

function Clock({className, minutes, seconds}) {
    return (
        <h2 className={"clock " + className}>
            <span>Left </span>
            <span className="clock__minutes">{minutes}</span>
            <span className="clock__delimiter">:</span>
            <span className="clock__seconds">{seconds}</span>
        </h2>
    );
}
Clock.defaultProps = {
    className : "",
    minutes : 20,
    seconds : 48
}

export default Clock;