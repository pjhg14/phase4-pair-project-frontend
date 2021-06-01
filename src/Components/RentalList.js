import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RentalList() {
  const [rentals, setRentals] = useState([]);
  const [hostName, setHostName] = useState("");

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
        setHostName(host.name);
        setRentals(host.rentals);
      });
  }, []);

  const rentalList = rentals.map((rental) => {
    return (
      <p key={rental.id}>
        <Link to={`/rentalinfo/${rental.id}`}>{rental.address}</Link>
      </p>
    );
  });

  return (
    <div>
      <Link to="/hostinfo">Welcome! {hostName}</Link>
      <h4>Rentals:</h4>
      {rentalList}
    </div>
  );
}
export default RentalList;
