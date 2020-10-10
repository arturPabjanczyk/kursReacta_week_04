import React from "react";

function TimeBox({onEdit, onDelete, timeBox}) {

        return (
            <div className="TimeBox">
                <h3>{timeBox.title} - {timeBox.totalTimeInMinutes} min.</h3>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onEdit}>Edit
                </button>
            </div>
        )
}

export default TimeBox;
