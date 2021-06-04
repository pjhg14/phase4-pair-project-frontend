import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Button, Image, Modal } from "semantic-ui-react";

function AppointmentInfo({ id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [appointment, setAppointment] = useState(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/appointments/${id}`)
                .then((resp) => resp.json())
                .then(queriedAppointment => {
                    setAppointment(queriedAppointment)
                    setIsLoaded(true)
                })
    },[id])

    if (!isLoaded) return <h1>Loading...</h1>;

    function handleDelete() {
        
    }

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Info</Button>}
        >
            <Modal.Header>{appointment.rental.address}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size="medium" src={appointment.rental.image} alt="Rental" />
                <Modal.Description>
                    <h4>Rental Info:</h4>
                    <p>Cost: {appointment.rental.cost} </p>
                    <p>Address: {appointment.rental.address} </p>
                    <p>Max Guests: {appointment.rental.max_guests} </p>
                    <p>Description: {appointment.rental.description} </p>

                    <h4>Appointment Info:</h4>
                    <p>Start Date: {appointment.start_date}</p>
                    <p>End Date {appointment.end_date}</p>
                    <p>Number of guests: {appointment.num_guests}</p>

                    <Link to={"/reserve"}>Update Appointment</Link>
                    <br></br>
                    <br></br>
                    <Button onClick={handleDelete}>Delete</Button>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default AppointmentInfo