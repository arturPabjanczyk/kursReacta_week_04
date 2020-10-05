import React from "react";
import uuid from "uuid";

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import TimeBox from "./TimeBox";
import TimeBoxForm from "./TimeBoxForm";
import TimeBoxUpdater from "./TimeBoxUpdater";

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

class CurrentTimeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
    }

    handleStart = (event) => {
        this.setState({isRunning: true})
        this.startTimer();
    }
    handleStop = (event) => {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    }

    startTimer() {
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    prevState => ({elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1})
                )
            },
            100
        );
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    togglePause = () => {
        this.setState(
            function (prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }

    render() {
        const {isPaused, isRunning, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return (
            <div className={`CurrentTimeBox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""}/>
                <ProgressBar percent={progressInPercent} className={isPaused ? "inactive" : ""}/>
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        )
    }
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

export { EditableTimeBox, TimeBoxList };