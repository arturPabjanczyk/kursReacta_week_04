import React from "react";
import PropTypes from "prop-types";

function Clock({className, minutes, seconds}) {
    return (
        <h2 className={"Clock " + className}>
            <span>Left </span>
            <span className="clock__minutes">{minutes}</span>
            <span className="clock__delimiter">:</span>
            <span className="clock__seconds">{seconds}</span>
        </h2>
    );
}

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Clock.defaultProps = {
    className: ""
}

Clock.propTypes = {
    className: PropTypes.string,
    minutes: NumberOrStringType.isRequired,
    seconds: NumberOrStringType.isRequired,
}

function NonNegativeNumberType(prop, propName, componentName) {
    if (prop[propName] < 0) {
        return new Error(`Invalid prop '${propName}' issued to component '${componentName}'. It has to be grater or equal to 0.`);
    }
}

export default Clock;