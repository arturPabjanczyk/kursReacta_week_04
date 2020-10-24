import React from "react";

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

export default TimeBoxEditor;