import React from "react";

function TimeBoxForm({handleTimeInMinutesChange, handleTitleChange, handleSubmit, title, totalTimeInMinutes}) {
  return (
    <form onSubmit={handleSubmit} className="TimeBoxForm">
      <label>
        What are you doing?
        <input
          value={title}
          onChange={handleTitleChange}
          type="text"
        />
      </label>
      <br/>
      <label>
        How many minutes?
        <input
          value={totalTimeInMinutes}
          onChange={handleTimeInMinutesChange}
          type="number"
        />
      </label>
      <br/>
      <button>
        Confirm
      </button>
    </form>
  )
}

export default TimeBoxForm;