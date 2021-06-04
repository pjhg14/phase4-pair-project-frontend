import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Form } from "semantic-ui-react"

function Reserve() {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [guests, setGuests] = useState("")
    const [renterId, setRenterId] = useState("")

    const {rental_id, apmt_id} = useParams()

    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:3000/renters/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
            .then(resp => resp.json())
            .then(queriedRenter => {
                console.log(queriedRenter);
                setRenterId(queriedRenter.id);
            });

        if (apmt_id) {
            fetch(`http://localhost:3000/appointments/${apmt_id}`)
                .then(resp => resp.json())
                .then(appointment => {
                    console.log(appointment);

                    setStart(appointment.start_date)
                    setEnd(appointment.end_date)
                    setGuests(appointment.num_guests)
                });
        }
    },[apmt_id])

    function formSubmit(event) {
        event.preventDefault()

        console.log(apmt_id)

        if (apmt_id) {
            handleUpdate()
        } else {
            handleAdd()
        }
    }

    function handleAdd() {
        fetch("http://localhost:3000/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rental_id: rental_id,
                renter_id: renterId,
                start_date: start,
                end_date: end,
                num_guests: guests
            }),
        })
            .then(res => res.json())
            .then(rental => {
                console.log(rental);
                history.push(`/renterpage`);
            });
    }

    function handleUpdate() {
        fetch(`http://localhost:3000/appointments/${apmt_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                start_date: start,
                end_date: end,
                num_guests: guests
            }),
        })
            .then((resp) => resp.json())
            .then(message => {
                console.log(message.message);
                history.push("/renterpage");
            });
    }

    return(
        <div className="form-container">
            <Form className="rental-form" onSubmit={formSubmit}>
                <Form.Group>
                    <label>Start Date:</label>
                    <input name="start-date" type="datetime-local" value={start} 
                        onChange={e => setStart(e.target.value)} min={new Date()}/>
                    <label>End Date:</label>
                    <input name="end-date" type="datetime-local" value={end} 
                        onChange={e => setEnd(e.target.value)} min={Date().getTime}/>
                    <Form.Input label="Number of guests" placeholder="# Guests" value={guests} 
                        onChange={e => setGuests(e.target.value)}/>
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )
}

export default Reserve