import React from "react";

import TimeBoxList from "./TimeBoxList"

import {EditableTimeBox} from "./remaining-components";

function App() {
    return (
        <div className="App">
            <EditableTimeBox/>
            <TimeBoxList/>
        </div>
    )
}

export default App;