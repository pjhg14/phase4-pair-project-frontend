import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";

function RentalInfo() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [rental, setRental] = useState(null);

  const history = useHistory();

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

  function handleDelete() {
    fetch(`http://localhost:3000/rentals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (message) {
        console.log(message.message);
        history.push("/rentals");
      });
  }

  return (
    <div>
      <p>Cost: {rental.cost} </p>
      <p>Address: {rental.address} </p>
      <p>Max Guests: {rental.max_guests} </p>
      <p>Description: {rental.description} </p>
      <img src={rental.image} alt="Rental" />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default RentalInfo;
