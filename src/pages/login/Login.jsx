import "./login.scss";
import Bro from "../../assets/login.png";
import AuthService from "../../service/AuthService";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true);
      window.location.replace("/");
    }
  }, []);

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../login.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice", // Animasyonun boyutlandırılmasıyla ilgili ayarlar
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(admin).then(
      (response) => {
        console.log(response);

        if (response.data.erole == "EMPLOYEE") {
          Cookies.set("token", response.data.token);
          Cookies.set("erole", response.data.erole);
          window.location.replace("/");
        } else {
          setLoginError(true);
        }
      },
      () => {
        setLoginError(true);
      }
    );
  };

  return (
    !isLoggedIn && (
      <div className="login">
        <div className="left">
          <div className="project-time-second-areass" ref={container}></div>
        </div>
        <div className="right">
          <div className="top">
            <h1 className="title-login">HumanCo Login</h1>
          </div>
          <form className="form__content" onSubmit={handleSubmit}>
            <div className="form__box">
              <input
                type="text"
                className="form__input"
                placeholder="Enter Email"
                onChange={(e) => {
                  {
                    setAdmin({ ...admin, email: e.target.value });
                  }
                }}
              />
              <label htmlFor="" className="form__label">
                ENTER EMAIL
              </label>
              <div className="form__shadow"></div>
            </div>
            <div className="form__box">
              <input
                type="password"
                className="form__input"
                placeholder="Enter password"
                onChange={(e) => {
                  {
                    setAdmin({ ...admin, password: e.target.value });
                  }
                }}
              />
              <label htmlFor="" className="form__label">
                ENTER PASSWORD
              </label>
              <div className="form__shadow"></div>
            </div>
            {loginError && (
              <p style={{ color: "red" }}>
                Login is incorrect please try again
              </p>
            )}
            <div>
              <Link
                to="/forgot"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="forgot">Forgot my password </p>
              </Link>
            </div>
            <div className="form__button">
              <input
                type="submit"
                className="form__submit dene"
                value="Sign-In"
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Login;
