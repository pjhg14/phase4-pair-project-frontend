import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Icon, Popup } from "semantic-ui-react";
import RentalInfo from "./RentalInfo";

function RentalList() {
  const [rentals, setRentals] = useState([]);
  const [host, setHost] = useState("");
  const [value, setValue] = useState(false);

  const history = useHistory()

  function forceUpdate() {
    setValue(!value);
  }

  function logOff() {
    localStorage.token = ""
    history.push("/")
  }

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
          setHost(host);
          setRentals(host.rentals);
        });
  }, [value]);

  const rentalList = rentals.map((rental) => {
    return (
      <Card
        key={rental.id}
        image={rental.image}
        header={rental.address}
        meta={`Max guests: ${rental.max_guests}`}
        extra={<RentalInfo forceUpdate={forceUpdate} rental_id={rental.id} />}
      />
    );
  });

  return (
    <div>
      <p>
        Welcome! <Link to="/hostinfo"> {host.name} </Link>
        <Popup content="Log Off" trigger={<Icon name="power" onClick={() => logOff()}/>}/>
      </p>
      <h4>Rentals:</h4>
      <Link to={`/rentalform/host/${host.id}`}>New Rental</Link>
      <Card.Group className="custom">{rentalList}</Card.Group>
    </div>
  );
}
export default RentalList;
