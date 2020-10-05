import React from "react";

function ProgressBar({className = "", percent = 33}) {
    return (
        <div className={"ProgressBar " + className}>
            <div style={{width: `${percent}%`}}/>
        </div>
    );
}

export default ProgressBar;