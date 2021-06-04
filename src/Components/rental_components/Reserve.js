import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Form } from "semantic-ui-react"

function Reserve() {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
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

                    // matcher = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/
                    // matcher = /^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/
                    console.log(appointment.start_date)
                    console.log(appointment.end_date)

                    let startDateConversion = appointment.start_date
                    let endDateConversion = appointment.end_date

                    if (!startDateConversion.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)) {
                        let pos = appointment.start_date.indexOf(":", 16)
                        startDateConversion = appointment.start_date.slice(0, pos) 
                    }
                    
                    if (!endDateConversion.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)) {
                        let pos = appointment.end_date.indexOf(":", 16)
                        endDateConversion = appointment.end_date.slice(0, pos)
                    }
                    

                    setStart(startDateConversion)
                    setEnd(endDateConversion)
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
            .then(message => {
                if (message.error) {
                    console.log(message);
                } else {
                    history.push(`/renterpage`);
                }
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
                if (message.error) {
                    console.log(message);
                } else {
                    history.push(`/renterpage`);
                }
            });
    }

    return(
        <div className="form-container">
            <Form className="rental-form" onSubmit={formSubmit}>
                <Form.Group>
                    <label>Start Date:</label>
                    <input name="start-date" type="datetime-local" value={start} 
                        onChange={e => setStart(e.target.value)}/>
                    <label>End Date:</label>
                    <input name="end-date" type="datetime-local" value={end} 
                        onChange={e => setEnd(e.target.value)}/>
                    <Form.Input label="Number of guests" placeholder="# Guests" value={guests} 
                        onChange={e => setGuests(e.target.value)}/>
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )
}

export default Reserve