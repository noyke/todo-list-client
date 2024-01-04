import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isValidUser, setIsValidUser] = useState(true);

  const handleSetUserName = (value: string) => {
    setIsValidUser(true);
    setUserName(value);
  };

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
        localStorage.setItem("userName", userData.user_name);
        navigate("/");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <UserForm
      isLoginForm={true}
      userName={userName}
      setUserName={handleSetUserName}
      userPassword={userPassword}
      setUserPassword={setUserPassword}
      handleClick={handleClick}
      displayError={!isValidUser}
      errorText="Incorrect User Name Or Password"
    />
  );
};

export default LoginPage;
