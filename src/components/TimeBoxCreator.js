import React from "react";
import uuid from "uuid";

import TimeBoxForm from "./TimeBoxForm";

class TimeBoxCreator extends React.Component {
    state = {
        title: "",
        totalTimeInMinutes: ""
    }
    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }
    handleTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onConfirm({
            id: uuid.v4(),
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        this.setState({title: "", totalTimeInMinutes: ""})
    }

    render() {
        const {title, totalTimeInMinutes} = this.state;
        return (
            <>
                <h3>
                    Creating new timeBox.
                </h3>
                <TimeBoxForm
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    handleTitleChange={this.handleTitleChange}
                    handleTimeInMinutesChange={this.handleTimeInMinutesChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}

export default TimeBoxCreator;