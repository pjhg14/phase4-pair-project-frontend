import { useState } from "react";
import { useHistory } from "react-router";

function HostForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  function update(event) {
    event.preventDefault();
    fetch("http://localhost:3000/hosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        } else {
          localStorage.token = message.token;
          history.push("/hostinfo");
        }
      });
  }

  return (
    <div>
      <p>Update Host</p>
      <form onSubmit={update}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone</label>
        <input
          name="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
export default HostForm;
