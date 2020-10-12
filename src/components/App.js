import React from "react";

import EditableTimeBox from "./EditableTimeBox";
import TimeBoxList from "./TimeBoxList";
import ErrorBoundary from "./ErrorBoundary";

function App() {
    return (
        <React.StrictMode>
            <div className="App">
                <ErrorBoundary message="Coś nie działa w całej aplikacji - wyślij email do support@artapps.pl">
                    <EditableTimeBox/>
                    <TimeBoxList/>
                </ErrorBoundary>
            </div>
        </React.StrictMode>
    )
}

export default App;