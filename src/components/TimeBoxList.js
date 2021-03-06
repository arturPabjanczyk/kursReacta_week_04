import React from "react";
import uuid from "uuid";

import TimeBoxUpdater from "./TimeBoxUpdater";
import TimeBoxCreator from "./TimeBoxCreator";
import TimeBox from "./TimeBox";
import ErrorBoundary from "./ErrorBoundary";

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
  }

  handleTitleChange = (changedTitle) => {
    this.setState({title: changedTitle})
  }
  handleTimeInMinutesChange = (changedTimeInMinutesChange) => {
    this.setState({totalTimeInMinutes: changedTimeInMinutesChange})
  }

  addTimeBox = (timeBox) => {
    throw new ErrorBoundary("Nie udało się utworzyć timeboxa");
    // this.setState(prevState => {
    //     const timeBoxes = [timeBox, ...prevState.timeBoxes];
    //     return {timeBoxes};
    // })
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
    try {
      this.addTimeBox(createdTimeBox)
    } catch (error) {
      console.log("Wystąpił błąd przy tworzeniu timeboxa: ", error);
    }
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
        <ErrorBoundary message="Coś się wykrzaczyło w liście :)">
          {!isEdited && this.state.timeBoxes.map((timeBox, index) => (
            <ErrorBoundary
              key={timeBox.id}
              message={`Coś się wykrzaczyło w timeBoxie ${timeBox.title}`}
            >
              <TimeBox
                timeBox={timeBox}
                onDelete={() => this.removeTimeBox(index)}
                onEdit={() => this.handleEdit(index, timeBox)}
              />
            </ErrorBoundary>
          ))}
        </ErrorBoundary>
      </>
    )
  }
}

export default TimeBoxList;