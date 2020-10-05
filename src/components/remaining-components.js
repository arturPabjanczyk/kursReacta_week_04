import React from "react";

import TimeBox from "./TimeBox";
import TimeBoxUpdater from "./TimeBoxUpdater";
import TimeBoxCreator from "./TimeBoxCreator";
import CurrentTimeBox from "./CurrentTimeBox";
import TimeBoxEditor from "./TimeBoxEditor";

class EditableTimeBox extends React.Component {
    state = {
        title: "Uczę się wyciągać stan w górę",
        totalTimeInMinutes: 12,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }
    handleTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value})
    }
    handleConfirm = (event) => {
        this.setState({isEditable: false})
    }
    handleEdit = (event) => {
        this.setState({isEditable: true})
    }

    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state;
        return (
            <>
                <TimeBoxEditor
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onTitleChange={this.handleTitleChange}
                    onTimeInMinutesChange={this.handleTimeInMinutesChange}
                    onConfirm={this.handleConfirm}
                />
                <CurrentTimeBox
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit}

                />
            </>
        )
    }
}

export { EditableTimeBox};