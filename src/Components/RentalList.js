import { useState, useEffect } from "react";

function RentalList() {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/host/1", {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (host) {
        console.log(host);
        setRentals(host.rentals);
      });
  }, []);
  //   const rentalList = rentals.map((rental) => {
  //     return <p key={rental.id}>{rental.address}</p>;
  //   });

  return <div></div>;
}
export default RentalList;
