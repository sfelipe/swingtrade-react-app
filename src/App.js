import React from "react";
import { Link } from "@reach/router";
import ErrorMessage from "./components/_partials/ErrorMessage";
import firebase from "./config/Firebase";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userID: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  changeTab(e) {
    var currTab = document.getElementById(e.target.id);
    var loginBtn = document.getElementsByClassName("login-btn");
    var loginBox = document.getElementsByClassName("login-box");
    var registerBtn = document.getElementsByClassName("register-btn");
    var registerBox = document.getElementsByClassName("register");

    if (currTab && loginBtn && loginBox && registerBtn && registerBox) {
      console.log(currTab.classList[0]);
      if (currTab.classList[0] === "register-btn") {
        currTab.classList.add("active");
        loginBtn[0].classList.remove("active");
        loginBox[0].classList.add("hidden");
        registerBox[0].classList.remove("hidden");
      } else if (currTab.classList[0] === "login-btn") {
        currTab.classList.add("active");
        registerBtn[0].classList.remove("active");
        registerBox[0].classList.add("hidden");
        loginBox[0].classList.remove("hidden");
      }
    }
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleLogin(e) {
    e.preventDefault();
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.history.push({
          pathname: "/dashboard",
          state: {
            email: this.state.email,
          },
        });
      })
      .catch((error) => {
        if (error.message !== null) {
          this.setState({ errorMessages: error.message });
        } else {
          this.setState({ errorMessages: null });
        }
      });
  }

  handleRegister(e) {
    e.preventDefault();
    const formInput = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords did not match" });
      return false;
    } else {
      this.setState({ errorMessage: null });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(formInput.email, formInput.password)
      .then(() => {
        this.setState({
          displayName: formInput.displayName,
          email: formInput.email,
        });
      })
      .catch((error) => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });

    this.props.history.push({
      pathname: "/dashboard",
      state: {
        user: this.state.user,
        displayName: formInput.displayName,
        email: formInput.email,
      },
    });
  }

  render() {
    return (
      <div>
        <div className="login-navbar">
          <div className="container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="138.5"
              height="29"
              viewBox="0 0 138.5 29"
            >
              <g
                id="Group_38"
                data-name="Group 38"
                transform="translate(-261.5 -22)"
              >
                <text
                  id="SWINGTRADE"
                  transform="translate(270 43)"
                  fill="#858080"
                  fontSize="20"
                  fontFamily="OpenSans-Regular, Open Sans"
                >
                  <tspan x="0" y="0">
                    SWING
                  </tspan>
                  <tspan
                    y="0"
                    fill="#fff"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                  >
                    TRADE
                  </tspan>
                </text>
                <line
                  id="Line_19"
                  data-name="Line 19"
                  x2="138"
                  transform="translate(261.5 49.5)"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </g>
            </svg>
            <nav>
              <ul>
                <li>
                  <Link to="#">Home</Link>
                  <Link to="#">Como usar</Link>
                  <Link to="#">Sobre</Link>
                  <Link to="#">Contato</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="container">
          <div className="tabNavigation">
            <p>{this.props.message}</p>
            <button
              className="login-btn active"
              id="btnLogin"
              onClick={this.changeTab}
              name="login"
            >
              login
            </button>
            <button
              className="register-btn"
              id="btnRegister"
              onClick={this.changeTab}
              name="register"
            >
              registrar-se
            </button>
          </div>
        </div>
        <section className="container">
          <div className="grid-6">
            <div className="login-box">
              <div className="login">
                <form onSubmit={this.handleLogin}>
                  {this.state.errorMessages !== null ? (
                    <ErrorMessage message={this.state.errorMessages} />
                  ) : null}
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <button type="submit">Login</button>
                </form>
                <Link
                  to="#"
                  style={{
                    display: "block",
                    paddingLeft: "120px",
                    paddingTop: "21px",
                    paddingBottom: "37px",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "Montserrat",
                    color: "#73A1C2",
                  }}
                >
                  Esqueci minha senha
                </Link>
                <span></span>
                <p>ou</p>
                <span></span>
                <button
                  className="social-btn"
                  name="facebook-login"
                  id="fb-login"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11.302"
                    height="21.102"
                    viewBox="0 0 11.302 21.102"
                  >
                    <path
                      id="facebook-f"
                      d="M33.451,11.87l.586-3.819H30.373V5.573a1.91,1.91,0,0,1,2.153-2.063h1.666V.258A20.316,20.316,0,0,0,31.235,0c-3.018,0-4.99,1.829-4.99,5.14V8.051H22.89V11.87h3.355V21.1h4.129V11.87Z"
                      transform="translate(-22.89)"
                      fill="#fff"
                    />
                  </svg>
                </button>
                <button className="social-btn" name="google-login" id="g-login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.822"
                    height="17.098"
                    viewBox="0 0 16.822 17.098"
                  >
                    <path
                      id="google"
                      d="M16.822,16.749A7.939,7.939,0,0,1,8.549,25.1a8.549,8.549,0,0,1,0-17.1,8.221,8.221,0,0,1,5.733,2.237l-2.327,2.237c-3.044-2.937-8.7-.731-8.7,4.075a5.355,5.355,0,0,0,5.3,5.4A4.623,4.623,0,0,0,13.4,18.262H8.549v-2.94h8.139a7.5,7.5,0,0,1,.134,1.427Z"
                      transform="translate(0 -8)"
                      fill="#fff"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden register container">
            <div className="grid-6 register-box">
              <form onSubmit={this.handleRegister}>
                {this.state.errorMessages !== null ? (
                  <ErrorMessage message={this.state.errorMessages} />
                ) : null}
                <input
                  type="text"
                  placeholder="Nome"
                  name="displayName"
                  onChange={this.handleChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  name="password"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  placeholder="Repita Sua senha"
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
                <button type="submit">Registrar-se</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
