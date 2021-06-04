import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Form, Button } from "semantic-ui-react";

function RentalForm() {
  const [cost, setCost] = useState("");
  const [address, setAddress] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();

  const { host_id, rental_id } = useParams();

  useEffect(() => {
    if (rental_id) {
      fetch(`http://localhost:3000/rentals/${rental_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(function (rental) {
          console.log(rental);
          setCost(rental.cost);
          setAddress(rental.address);
          setMaxGuests(rental.max_guests);
          setDescription(rental.description);
          setImage(rental.image);
        });
    }
  }, [rental_id]);

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
        history.push(`/rentals/host`);
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
        history.push(`/rentals/host`);
      });
  }

  return (
    <div className="form-container">
      <Form className="rental-form" onSubmit={formSubmit}>
        <Form.Field>
          <label>Cost: </label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Max Guests: </label>
          <input
            type="text"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </Form.Field>
        <Form.Field>
          <label>Image: </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>{" "}
      </Form>
    </div>
  );
}

export default RentalForm;
