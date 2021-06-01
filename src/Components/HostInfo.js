import { useEffect, useState } from "react";
import { useHistory } from "react-router";

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
    history.push("/rentals");
  }

  function toHostForm(event) {
    history.push("/hostform");
  }

  return (
    <div>
      <p>Name: {host.name}</p>
      <p>Email: {host.email}</p>
      <p>Phone: {host.phone}</p>
      <p>About: {host.about}</p>

      <button onClick={toRentalList}>Back</button>
      <button onClick={toHostForm}>Update Info</button>
    </div>
  );
}

export default HostInfo;
