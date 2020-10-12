import React from "react";
import PropTypes from "prop-types";

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

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Clock.defaultProps = {
    className : "",
    minutes : 20,
    seconds : 48
}

Clock.propTypes = {
    className: PropTypes.string,
    minutes: PropTypes.number.isRequired,
    seconds: NumberOrStringType.isRequired,
}

export default Clock;