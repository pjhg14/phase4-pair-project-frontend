import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function RentalList() {
  const [rentals, setRentals] = useState([]);
  const [host, setHost] = useState("");

  const { type } = useParams()

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
      .then(renter => {
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
      <p key={rental.id}>
        <Link to={`/rentalinfo/${rental.id}`}>{rental.address}</Link>
      </p>
    );
  });

  return (
    <div>
      {type === "host" ? 
      <p></p>
      : 
      <p></p>}
      <p>Welcome! <Link to="/hostinfo"> {host.name}</Link></p>
      <h4>Rentals:</h4>
      <Link to={`/rentalform/host/${host.id}`}>New Rental</Link>
      {rentalList}
    </div>
  );
}
export default RentalList;
