import React from "react";
import uuid from "uuid";

import TimeBox from "./TimeBox";
import TimeBoxUpdater from "./TimeBoxUpdater";
import TimeBoxCreator from "./TimeBoxCreator";
import CurrentTimeBox from "./CurrentTimeBox";

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

function TimeBoxEditor(props) {
    const {
        title,
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTimeInMinutesChange,
        onConfirm
    } = props;
    return (
        <div className={`TimeBoxEditor ${isEditable ? "" : "inactive"}`}>
            <label>
                What are you doing?
                <input
                    disabled={!isEditable}
                    value={title}
                    type="text"
                    onChange={onTitleChange}
                />
            </label>
            <br/>
            <label>
                How many minutes?
                <input
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    type="number"
                    onChange={onTimeInMinutesChange}
                />
            </label>
            <br/>
            <button
                onClick={onConfirm}
                disabled={!isEditable}>
                Confirm
            </button>
        </div>
    )
}

class TimeBoxList extends React.Component {

    state = {
        editedTimeBox: {},
        index: 0,
        isEdited: false,
        title: "",
        totalTimeInMinutes: "",
        timeBoxes: [
            {id: uuid.v4(), title: "title1", totalTimeInMinutes: "13"},
            {id: uuid.v4(), title: "title2", totalTimeInMinutes: "13"},
            {id: uuid.v4(), title: "title3", totalTimeInMinutes: "14"}
        ]
    }

    handleTitleChange = (changedTitle) => {
        this.setState({title: changedTitle})
    }
    handleTimeInMinutesChange = (changedTimeInMinutesChange) => {
        this.setState({totalTimeInMinutes: changedTimeInMinutesChange})
    }

    addTimeBox = (timeBox) => {
        this.setState(prevState => {
            const timeBoxes = [timeBox, ...prevState.timeBoxes];
            return {timeBoxes};
        })
    }

    removeTimeBox = (indexToRemove) => {
        this.setState(prevState => {
            const timeBoxes = prevState.timeBoxes.filter((timeBox, index) => index !== indexToRemove)
            return {timeBoxes};
        })
    }

    updateTimeBox = (index, updatedTimeBox) => {
        this.setState(prevState => {
            const timeBoxes = prevState.timeBoxes.map((timeBox, index) =>
                index === this.state.index ? updatedTimeBox : timeBox
            )
            return {timeBoxes};
        }, () => {
            this.setState({isEdited: false})
        })
    }

    handleCreate = (createdTimeBox) => {
        this.addTimeBox(createdTimeBox)
    }

    handleEdit = (index, editedTimeBox) => {
        this.setState({
            index: index,
            editedTimeBox: editedTimeBox,
        }, () => {
            this.setState({
                isEdited: true,
            })
        })
    }

    render() {
        const {index, isEdited, title, totalTimeInMinutes, editedTimeBox} = this.state;
        return (
            <>
                {isEdited ?
                    <TimeBoxUpdater
                        index={index}
                        editedTimeBox={editedTimeBox}
                        onConfirm={this.updateTimeBox}
                        handleTitleChange={this.handleTitleChange}
                        handleTimeInMinutesChange={this.handleTimeInMinutesChange}
                    /> :
                    <TimeBoxCreator onConfirm={this.handleCreate}/>}
                {!isEdited && this.state.timeBoxes.map((timeBox, index) => (
                    <TimeBox
                        key={timeBox.id}
                        timeBox={timeBox}
                        onDelete={() => this.removeTimeBox(index)}
                        onEdit={() => this.handleEdit(index, timeBox)}
                    />
                ))}
            </>
        )
    }
}

export { EditableTimeBox, TimeBoxList };