import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface todoItem {
  todo_item: string;
}

const TodoListPage = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<todoItem[]>([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const addTodo = async () => {
    const todoData = {
      user_name: localStorage.getItem("userName"),
      todo_item: todo,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/addtodo",
        todoData
      );
      console.log(response.data);
      setTodo("");
      getTodoList();
    } catch (err) {
      console.log("error:", err);
    }
  };

  const getTodoList = async () => {
    const obj = { user_name: localStorage.getItem("userName") };
    try {
      const response = await axios.post("http://localhost:3000/gettodos", obj);
      setTodoList(response.data);
    } catch (err) {
      console.log("error:", err);
    }
  };

  const handleCheck = async (todoToDelete: string) => {
    const todoToDeleteData = {
      user_name: localStorage.getItem("userName"),
      todo_item: todoToDelete,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/deletetodo",
        todoToDeleteData
      );
      getTodoList();
      console.log(response.data);
    } catch (err) {
      console.log("error:", err);
    }
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
    getTodoList();
  }, []);

  return (
    <>
      <p style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={logout}>logOut</button>
      </p>
      <h3>{`${localStorage.getItem("userName")}'s Todo List`}</h3>
      {todoList.map((item) => (
        <p key={item.todo_item}>
          <input onClick={() => handleCheck(item.todo_item)} type="checkbox" />
          <label>{item.todo_item}</label>
        </p>
      ))}
      <p>
        <input
          id="todoText"
          type="text"
          onChange={(event) => setTodo(event.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Add todo</button>
      </p>
    </>
  );
};

export default TodoListPage;
