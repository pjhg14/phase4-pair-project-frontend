import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, Button } from "semantic-ui-react";

function HostForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/hosts/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (host) {
        console.log(host);
        setName(host.name);
        setEmail(host.email);
        setPhone(host.phone);
        setAbout(host.about);
      });
  }, []);

  function update(event) {
    event.preventDefault();
    fetch("http://localhost:3000/hosts/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    })
      .then((res) => res.json())
      .then((message) => {
        if (message.error) {
          console.log(message.error);
        } else {
          console.log(message);
          history.push("/hostinfo");
        }
      });
  }

  return (
    <div className="form-container">
      <p>Update Host</p>

      <Form className="host-form" onSubmit={update}>
        <Form.Field>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>About</label>
          <textarea
            name="about"
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>{" "}
      </Form>
    </div>
  );
}
export default HostForm;
