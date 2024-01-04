import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import TodoListPage from "./routes/TodoListPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TodoListPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
