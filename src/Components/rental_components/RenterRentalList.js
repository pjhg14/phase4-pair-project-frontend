import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import AppointmentInfo from "./AppointmentInfo";

function RenterRentalList({ appointmentList }) {
    const [appointments, setAppointments] = useState([])
    const [rentals, setRentals] = useState([])
    const [value, setValue] = useState(true)

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
                setAppointments(queriedRenter.appointments);
                setRentals(queriedRenter.rentals)
            });
      }, [value]);

    function forceUpdate() {
        setValue(!value)
    }

    console.log(rentals)
    const rentalCards = appointments.map(appointment => {
        const rental = rentals.filter(rental => rental.id === appointment.rental_id)[0]
        console.log(rentals)

        if (rentals.length !== 0) {
           return(
            <Card
                key={appointment.id}
                image={rental.image}
                header={`Appointment on: ${appointment.start_date}`}
                meta={`Address: ${rental.address}`}
                extra={<AppointmentInfo id={appointment.id} forceUpdate={forceUpdate}/>}
            />
        ) 
        }else {
            return <Card/>
        }
        
    })

    return(
        <Card.Group className="custom">
            {rentalCards}
        </Card.Group>
    )
}

export default RenterRentalList