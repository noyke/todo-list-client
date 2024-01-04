import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(true);

  const navigate = useNavigate();

  const handleSetUserName = (value: string) => {
    setIsUserNameAvailable(true);
    setUserName(value);
  };

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
    <UserForm
      isLoginForm={false}
      userName={userName}
      setUserName={handleSetUserName}
      userPassword={userPassword}
      setUserPassword={setUserPassword}
      handleClick={handleClick}
      displayError={!isUserNameAvailable}
      errorText="User Name Is Unavailable, Please Choose Another"
    />
  );
};

export default RegisterPage;
