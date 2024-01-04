import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";

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
        <Button variant="danger" onClick={logout}>
          logOut
        </Button>
      </p>
      <Container>
        <Form>
          <h2>{`${localStorage.getItem("userName")}'s Todo List`}</h2>
          {todoList.map((item) => (
            <Form.Check
              key={item.todo_item}
              label={item.todo_item}
              style={{ fontSize: "20px" }}
              onClick={() => handleCheck(item.todo_item)}
            />
          ))}
          <p>
            <input
              id="todoText"
              type="text"
              onChange={(event) => setTodo(event.target.value)}
              value={todo}
            />
            <Button
              variant="success"
              style={{ margin: "20px" }}
              onClick={addTodo}
            >
              Add todo
            </Button>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default TodoListPage;
