import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoListPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const validation = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data.UserError) {
        navigate("/login");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <div>
      <button onClick={logout}>logOut</button>
      <h3>My Todo List</h3>
    </div>
  );
};

export default TodoListPage;
