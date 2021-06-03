import { useState } from "react";
import { useHistory, useParams } from "react-router";

function RentalForm() {
  const [cost, setCost] = useState("");
  const [address, setAddress] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();

  const { host_id, rental_id } = useParams();

  function formSubmit(e) {
    e.preventDefault();
    if (host_id) {
      handleAdd();
    } else {
      handleUpdate();
    }
  }

  function handleUpdate() {
    fetch(`http://localhost:3000/rentals/${rental_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        cost: cost,
        address: address,
        max_guests: maxGuests,
        description: description,
        image: image,
      }),
    })
      .then((resp) => resp.json())
      .then(function (message) {
        console.log(message.message);
        history.push(`/rentalinfo/${rental_id}`);
      });
  }

  function handleAdd() {
    fetch("http://localhost:3000/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host_id: host_id,
        cost: cost,
        address: address,
        max_guests: maxGuests,
        description: description,
        image: image,
      }),
    })
      .then((res) => res.json())
      .then((rental) => {
        console.log(rental);
        history.push(`/rentalinfo/${rental.id}`);
      });
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label>Cost: </label>
        <input
          type="text"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <label>Address: </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Max Guests: </label>
        <input
          type="text"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
        />
        <label>Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Image: </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default RentalForm;