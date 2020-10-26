import React from "react";

class ProgressBarJquery extends React.Component {

  constructor(props) {
    super(props);
    this.progressBarContainer = React.createRef();
  }

  componentDidMount() {
    window.$(this.progressBarContainer.current).progressbar({
      value: this.props.percent
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.$(this.progressBarContainer.current).progressbar({
      value: this.props.percent
    });
  }

  componentWillUnmount() {
    window.$(this.progressBarContainer.current).progressbar("destroy");
  }

  render() {
    return <div ref={this.progressBarContainer}/>
  }
}

export default ProgressBarJquery;