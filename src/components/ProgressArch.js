import React from "react";

class ProgressArch extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const {height, isPaused, percent, width} = this.props;
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.filter = isPaused ? 'blur(2px) grayscale(1)' : 'none';

    const shape = new Path2D();
    ctx.strokeStyle = "orangered";
    shape.arc(150, 150, 150, Math.PI, Math.PI * 2, false);
    shape.lineTo(0, 150);
    ctx.stroke(shape);

    const segment = new Path2D();
    ctx.fillStyle = "orangered";
    segment.arc(150, 150, 150, Math.PI, Math.PI * (1 + percent / 100), false);
    segment.lineTo(150, 150);
    segment.lineTo(0, 150);
    ctx.fill(segment);
  }

  render() {
    const {height, width} = this.props;
    return (
      <canvas
        ref={this.canvas}
        width={width}
        height={height}
      />
    );
  }
}

export default ProgressArch;