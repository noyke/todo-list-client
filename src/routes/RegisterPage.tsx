import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(true);

  const navigate = useNavigate();

  const handleClick = async () => {
    const userData = {
      user_name: userName,
      user_password: userPassword,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        userData
      );
      if (response.data.UserError) {
        setIsUserNameAvailable(false);
      } else navigate("/login");
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <div>
      <h2>Register:</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Choose User Name:
          <input
            type="text"
            name="userName"
            onChange={(event) => setUserName(event.target.value)}
          ></input>
        </label>
        <div>
          <label>
            Choose Password:
            <input
              type="password"
              name="password"
              onChange={(event) => setUserPassword(event.target.value)}
            ></input>
          </label>
        </div>
        <h2></h2>
        <button type="submit" onClick={handleClick}>
          Register
        </button>
        {!isUserNameAvailable && (
          <h4>User name is unavailable, please choose another</h4>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
