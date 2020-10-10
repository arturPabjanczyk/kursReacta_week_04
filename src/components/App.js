import React from "react";

import EditableTimeBox from "./EditableTimeBox";
import TimeBoxList from "./TimeBoxList";
import Error from "./Error";

function App() {
    return (
        <React.StrictMode>
            <div className="App">
                <Error message="Coś nie działa w całej aplikacji - wyślij email do support@artapps.pl">
                    <EditableTimeBox/>
                    <TimeBoxList/>
                </Error>
            </div>
        </React.StrictMode>
    )
}

export default App;