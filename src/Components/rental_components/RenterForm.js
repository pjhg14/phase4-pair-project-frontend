import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form } from "semantic-ui-react";

function RenterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:3000/renters/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then(resp => resp.json())
        .then(renter => {
            console.log(renter);

            setName(renter.name)
            setEmail(renter.email)
            setPhone(renter.phone)
        });
    },[])

    function update(event) {
        event.preventDefault();
        fetch("http://localhost:3000/renters/edit", {
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
          .then(res => res.json())
          .then(message => {
            if (message.error) {
                console.log(message.error);
            } else {
                console.log(message);
                history.push("/renterinfo");
            }
          });
      }


    return(
        <div className="form-container">
            <Form className="rental-form" onSubmit={update}>
                <Form.Group>
                    <Form.Input label="Name" placeholder="Name..." value={name} onChange={e => setName(e.target.value)}/>
                    <Form.Input label="Email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Input label="Phone" placeholder="Phone..." value={phone} onChange={e => setPhone(e.target.value)}/>
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )
}

export default RenterForm