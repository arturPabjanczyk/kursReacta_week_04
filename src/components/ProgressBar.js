import React from "react";
import classNames from "classnames"

function ProgressBar({className, percent, big, color}) {
  let progressClassName = classNames(
    "progress",
    className,
    {
      "progress--big": big,
      "progress--color-red": color === "red"
    }
  );
  return (
    <div className={progressClassName}>
      <div className={"progress__bar"} style={{width: `${percent}%`}}/>
    </div>
  );
}

ProgressBar.defaultProps = {
  className: "",
  percent: 33,
  big: false,
  color: null
}

export default ProgressBar;