import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isValidUser, setIsValidUser] = useState(true);

  const navigate = useNavigate();

  const handleClick = async () => {
    const userData = {
      user_name: userName,
      user_password: userPassword,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      if (response.data.UserError) {
        setIsValidUser(false);
      } else {
        setIsValidUser(true);
        localStorage.setItem("accessToken", response.data);
        navigate("/");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <div>
      <h2>Login:</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          User Name:
          <input
            type="text"
            name="userName"
            onChange={(event) => setUserName(event.target.value)}
          ></input>
        </label>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={(event) => setUserPassword(event.target.value)}
            ></input>
          </label>
        </div>
        <h2></h2>
        <button type="submit" onClick={handleClick}>
          Login
        </button>
        {!isValidUser && <h4 color="red">Incorrect username or password</h4>}
      </form>
      <h3>
        <Link to={"/register"}>Register?</Link>
      </h3>
    </div>
  );
};

export default LoginPage;
