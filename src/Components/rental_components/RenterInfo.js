import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon } from "semantic-ui-react";

function RenterInfo() {
    const [renter, setRenter] = useState({
        name: "",
        email: "",
        phone: "",
    });
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
            .then(queriedRenter => {
                console.log(queriedRenter);
                setRenter(queriedRenter);
            });
      }, []);

      function toRenterPage(event) {
        history.push("/renterpage");
      }
    
      function toRenterForm(event) {
        history.push("/renterform");
      }

    return(
        <div>
            <p>
                <Icon name="user"></Icon> {renter.name}
            </p>
            <p>
                <Icon name="mail"></Icon> {renter.email}
            </p>
            <p>
                <Icon name="phone"></Icon> {renter.phone}
            </p>
            <Button onClick={toRenterPage}>Back</Button>
            <Button onClick={toRenterForm}>Update Info</Button>
        </div>
    )
}

export default RenterInfo