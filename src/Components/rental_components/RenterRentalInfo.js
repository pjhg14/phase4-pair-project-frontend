import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Button, Image, Modal } from "semantic-ui-react";

function RenterRentalInfo({ id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rental, setRental] = useState(null);
  
    const [open, setOpen] = useState(false);

    useEffect(() => {
            fetch(`http://localhost:3000/rentals/${id}`)
                .then((resp) => resp.json())
                .then(queriedRental => {
                    setRental(queriedRental)
                    setIsLoaded(true)
                })
    },[id])

    if (!isLoaded) return <h1>Loading...</h1>;

    return(
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
                    <br/>
                    <Link to={`/reserve/rental/${rental.id}`}>Create Appointment</Link>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default RenterRentalInfo