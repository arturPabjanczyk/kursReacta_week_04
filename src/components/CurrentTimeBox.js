import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import {getMinutesAndSecondsFromDurationInSeconds} from "../lib/time"
import ProgressArch from "./ProgressArch";
import ProgressBarJquery from "./ProgressBarJquery";

class CurrentTimeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0
    }
    this.intervalId = null;
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
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
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(
        () => {
          this.setState(
            prevState => ({elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1})
          )
        },
        100
      );
    }
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
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
    const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    return (
      <div className={`CurrentTimeBox ${isEditable ? "inactive" : ""}`}>
        <h1>{title}</h1>
        <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""}/>
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? "inactive" : ""}
          color="red"
          big
        />
        <ProgressArch
          height={160}
          width={300}
          percent={progressInPercent}
          isPaused={isPaused}
        />
        <ProgressBarJquery percent={progressInPercent}/>
        <br/>
        <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
        <button onClick={this.handleStart} disabled={isRunning}>Start</button>
        <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
        Liczba przerw: {pausesCount}
      </div>
    )
  }
}

export default CurrentTimeBox;