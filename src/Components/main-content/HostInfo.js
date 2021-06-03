import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon } from "semantic-ui-react";

function HostInfo() {
  const [host, setHost] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
  });
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
      .then(function (queriedHost) {
        console.log(queriedHost);
        setHost(queriedHost);
      });
  }, []);

  function toRentalList(event) {
    history.push("/rentals/host");
  }

  function toHostForm(event) {
    history.push("/hostform");
  }

  return (
    <div>
      <p>
        <Icon name="user"></Icon> {host.name}
      </p>
      <p>
        <Icon name="mail"></Icon> {host.email}
      </p>
      <p>
        <Icon name="phone"></Icon> {host.phone}
      </p>
      <p>
        <Icon name="info circle"></Icon> {host.about}
      </p>
      <Button onClick={toRentalList}>Back</Button>
      <Button onClick={toHostForm}>Update Info</Button>
    </div>
  );
}

export default HostInfo;
