import React from "react";
import firebase from "../../config/Firebase";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userID: null,
      displayName: null,
      email: null,
      errorMessages: "",
    };
  }

  componentDidMount() {
    const { email, displayName } = this.props.location.state;
    this.setState({
      email: email,
      displayName: displayName,
    });
    firebase.auth().onAuthStateChanged((User) => {
      if (User) {
        this.setState({
          user: User,
          userID: User.uid,
        });
        console.log(User);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <p>Olá {this.state.displayName}</p>
      </div>
    );
  }
}

export default Dashboard;
