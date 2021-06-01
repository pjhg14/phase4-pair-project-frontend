import { useParams } from "react-router";
import { useState, useEffect } from "react";

function RentalInfo() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [rental, setRental] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/rentals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (displayRental) {
        console.log(displayRental);
        setRental(displayRental);
        setIsLoaded(true);
      });
  }, [id]);

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div>
      <p>Cost: {rental.cost} </p>
      <p>Address: {rental.address} </p>
      <p>Max Guests: {rental.max_guests} </p>
      <p>Description: {rental.description} </p>
      <img src={rental.image} alt="Rental" />
    </div>
  );
}

export default RentalInfo;
