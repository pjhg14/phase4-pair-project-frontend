import { useState } from "react";
import { useHistory } from "react-router";

function SignUp() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")

    const history = useHistory();
  
    function logIn(e) {
      e.preventDefault();

      fetch("http://localhost:3000/hosts", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            name: name,
            password: password,
            email: email,
            phone: phone,
            about: "" 
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          localStorage.token = message.token;
          history.push("/rentals");
        });
    }

    function login(event) {
        history.push("/")
    }

    return(
        <div>
            <p>Sign Up</p>
            <form onSubmit={logIn}>
                <label>Name</label>
                <input
                    name="email"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    name="email"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input type="submit" />
            </form>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default SignUp