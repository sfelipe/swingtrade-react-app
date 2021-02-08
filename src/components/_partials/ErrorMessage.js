import React from "react";

class ErrorMessage extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="error-message">
        <p>{message}</p>
      </div>
    );
  }
}

export default ErrorMessage;
