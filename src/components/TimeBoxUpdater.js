import React from "react";

import TimeBoxForm from "./TimeBoxForm";

class TimeBoxUpdater extends React.Component {
    state = {
        index: this.props.index,
        updatedTimeBox: this.props.editedTimeBox,
        titleInput: this.props.editedTimeBox.title,
        totalTimeInMinutesInput: this.props.editedTimeBox.totalTimeInMinutes,
    }
    handleTitleChange = (event) => {
        this.setState({titleInput: event.target.value})
    }
    handleTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutesInput: event.target.value})
    }
    handleSubmit = () => {
        this.setState(prevState => ({
            updatedTimeBox: {
                ...prevState.updatedTimeBox,
                title: this.state.titleInput,
                totalTimeInMinutes: this.state.totalTimeInMinutesInput
            }
        }), () => {
            this.props.onConfirm(
                this.state.index,
                this.state.updatedTimeBox
            )
        })
    }

    render() {
        const {titleInput, totalTimeInMinutesInput, updatedTimeBox} = this.state;
        return (
            <>
                <h3>
                    Editing: {updatedTimeBox.title}
                </h3>
                <TimeBoxForm
                    title={titleInput}
                    totalTimeInMinutes={totalTimeInMinutesInput}
                    handleTitleChange={this.handleTitleChange}
                    handleTimeInMinutesChange={this.handleTimeInMinutesChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}

export default TimeBoxUpdater;