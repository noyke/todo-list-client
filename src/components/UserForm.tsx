import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  isLoginForm: boolean;
  userName: string;
  setUserName: (userName: string) => void;
  userPassword: string;
  setUserPassword: (userPassword: string) => void;
  handleClick: () => void;
  displayError: boolean;
  errorText: string;
}

const UserForm = ({
  isLoginForm,
  userName,
  setUserName,
  userPassword,
  setUserPassword,
  handleClick,
  displayError,
  errorText,
}: Props) => {
  const pageTitle = isLoginForm ? "Login:" : "Register:";
  const userNamePlaceholder = isLoginForm
    ? "Your User Name"
    : "Choose User Name";
  const passwordPlaceholder = isLoginForm ? "Your Password" : "Choose Password";

  const handleButtonClick = () => {
    handleClick();

    setUserName("");
    setUserPassword("");
  };

  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center">
        <Form onSubmit={(event) => event.preventDefault()}>
          <h2>{pageTitle}</h2>
          <Form.Group className="mb-3" style={{ width: "350px" }}>
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder={userNamePlaceholder}
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder={passwordPlaceholder}
              onChange={(event) => setUserPassword(event.target.value)}
              value={userPassword}
            ></Form.Control>
          </Form.Group>
          <p>
            {displayError && (
              <Form.Text className="text-danger">{errorText}</Form.Text>
            )}
          </p>
          <Button variant="primary" type="submit" onClick={handleButtonClick}>
            {isLoginForm ? "Login" : "Register"}
          </Button>
          <p>
            <label style={{ marginTop: "10px" }}>
              {isLoginForm ? (
                <Link to={"/register"}>Register?</Link>
              ) : (
                <Link to={"/login"}>Login?</Link>
              )}
            </label>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default UserForm;
