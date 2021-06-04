import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function HostUser() {
  const [lsToggle, setLsToggle] = useState(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");

  const history = useHistory();

  function logIn(e) {
    e.preventDefault();

    fetch("http://localhost:3000/host/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((message) => {
        if (message.error) {
          setErrors(message.error);
        } else {
          localStorage.token = message.token;
          history.push("/rentals/host");
        }
      });
  }

  function SignUp(e) {
    e.preventDefault();

    fetch("http://localhost:3000/hosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
        phone: phone,
        about: "",
      }),
    })
      .then((res) => res.json())
      .then((message) => {
        localStorage.token = message.token;
        history.push("/rentals/host");
      });
  }

  return (
    <div className="form-container">
      {errors && <p>{errors}</p>}
      <p>{lsToggle ? "Login" : "Sign Up"} as Host</p>
      {lsToggle ? (
        <Form className="login-form" onSubmit={logIn}>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>{" "}
        </Form>
      ) : (
        <Form className="login-form" onSubmit={SignUp}>
          <Form.Field>
            <label>Name</label>
            <input
              name="email"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input
              name="email"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>{" "}
        </Form>
      )}
      <br></br>
      <div>
        <Button onClick={() => setLsToggle(!lsToggle)}>
          {!lsToggle ? "Login" : "Sign Up"}{" "}
        </Button>
      </div>
      <Link to="/renter/portal">Renter Portal</Link>
    </div>
  );
}

export default HostUser;
