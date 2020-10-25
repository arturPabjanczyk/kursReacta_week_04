import React from "react";

class ProgressArch extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.opacityUp = true;
    this.opacity = 0;
  }

  componentDidMount() {
    this.draw();
    this.animationRequestId = window.requestAnimationFrame(this.update)
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationRequestId);
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
    ctx.fillStyle = `rgba(255, 69, 0, ${this.opacity})`;
    segment.arc(150, 150, 150, Math.PI, Math.PI * (1 + percent / 100), false);
    segment.lineTo(150, 150);
    segment.lineTo(0, 150);
    ctx.fill(segment);
  }

  update = () => {
    this.opacity = this.opacityUp ? this.opacity + 0.01 : this.opacity - 0.01;
    if (this.opacity > 1) {
      this.opacityUp = false;
    }
    if (this.opacity < 0.2) {
      this.opacityUp = true;
    }
    this.draw();
    this.animationRequestId = window.requestAnimationFrame(this.update);
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