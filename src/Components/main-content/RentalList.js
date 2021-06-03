import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import RentalInfo from "./RentalInfo";

function RentalList() {
  const [rentals, setRentals] = useState([]);
  const [host, setHost] = useState("");

  const { type } = useParams();

  useEffect(() => {
    if (type === "host") {
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
    } else {
      fetch("http://localhost:3000/renters/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((resp) => resp.json())
        .then((renter) => {
          console.log(renter);
          // setRentals();
        });

      // fetch("http://localhost:3000/rentals", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.token}`,
      //   },
      // })
      //   .then((resp) => resp.json())
      //   .then(rentals => {
      //     console.log(renter);
      //     setRentals(rentals);
      //   });
    }
  }, [type]);

  const rentalList = rentals.map((rental) => {
    return (
      <Card
        key={rental.id}
        image={rental.image}
        header={rental.address}
        meta={`Max guests: ${rental.max_guests}`}
        extra={<RentalInfo rental_id={rental.id} />}
      />
    );
  });

  return (
    <div>
      {type === "host" ? <p></p> : <p></p>}
      <p>
        Welcome! <Link to="/hostinfo"> {host.name}</Link>
      </p>
      <h4>Rentals:</h4>
      <Link to={`/rentalform/host/${host.id}`}>New Rental</Link>
      <div>{rentalList}</div>
    </div>
  );
}
export default RentalList;
