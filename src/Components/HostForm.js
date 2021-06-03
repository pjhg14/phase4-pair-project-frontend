import { useState } from "react";
import { useHistory } from "react-router";

function HostForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  function update(event) {
    event.preventDefault();
    fetch("http://localhost:3000/hosts/1", {
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
