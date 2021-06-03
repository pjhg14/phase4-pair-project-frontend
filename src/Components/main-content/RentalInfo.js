import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Modal } from "semantic-ui-react";

function RentalInfo({ rental_id }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rental, setRental] = useState(null);

  const history = useHistory();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/rentals/${rental_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (displayRental) {
        console.log(displayRental);
        console.log(rental_id);
        setRental(displayRental);
        setIsLoaded(true);
      });
  }, [rental_id]);

  if (!isLoaded) return <h1>Loading...</h1>;

  function handleDelete() {
    fetch(`http://localhost:3000/rentals/${rental_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((resp) => resp.json())
      .then(function (message) {
        console.log(message.message);
        history.push("/redirect");
      });
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Info</Button>}
    >
      <Modal.Header>{rental.address}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={rental.image} alt="Rental" />
        <Modal.Description>
          <p>Cost: {rental.cost} </p>
          <p>Address: {rental.address} </p>
          <p>Max Guests: {rental.max_guests} </p>
          <p>Description: {rental.description} </p>
          <Link to={`/rentalform/${rental.id}`}>Update</Link>
          <br></br>
          <br></br>
          <Button onClick={handleDelete}>Delete</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default RentalInfo;
