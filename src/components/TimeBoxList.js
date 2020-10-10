import React from "react";
import uuid from "uuid";

import TimeBoxUpdater from "./TimeBoxUpdater";
import TimeBoxCreator from "./TimeBoxCreator";
import TimeBox from "./TimeBox";

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
        ],
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.log("Wystąpił następujący błąd: ", error, info.componentStack);
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
        const {editedTimeBox, editedIndex, isEdited,} = this.state;
        return (
            <>
                {isEdited ?
                    <TimeBoxUpdater
                        index={editedIndex}
                        editedTimeBox={editedTimeBox}
                        onConfirm={this.updateTimeBox}
                        handleTitleChange={this.handleTitleChange}
                        handleTimeInMinutesChange={this.handleTimeInMinutesChange}
                    /> :
                    <TimeBoxCreator onConfirm={this.handleCreate}/>
                }
                {
                    this.state.hasError ?
                        "coś się wykrzaczyło" :
                        !isEdited && this.state.timeBoxes.map((timeBox, index) => (
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

export default TimeBoxList;