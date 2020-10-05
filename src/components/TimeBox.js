import React from "react";

class TimeBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onDelete, onEdit, timeBox} = this.props;
        return (
            <div className="TimeBox">
                <h3>{timeBox.title} - {timeBox.totalTimeInMinutes} min.</h3>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onEdit}>Edit
                </button>
            </div>
        )
    }
}

export default TimeBox;
