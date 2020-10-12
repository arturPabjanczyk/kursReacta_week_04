import React from "react";
import PropTypes from "prop-types";

class Error extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.log("Wystąpił następujący błąd: ", error, info.componentStack);
    }

    render() {
        const {children, message} = this.props;
        return this.state.hasError ? message : children;
    }
}

Error.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default Error;