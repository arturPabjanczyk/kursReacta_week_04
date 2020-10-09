import React from "react";

import EditableTimeBox from "./EditableTimeBox";
import TimeBoxList from "./TimeBoxList";

function App() {
    return (
        <React.StrictMode>
            <div className="App">
                <EditableTimeBox/>
                <TimeBoxList/>
            </div>
        </React.StrictMode>
    )
}

export default App;