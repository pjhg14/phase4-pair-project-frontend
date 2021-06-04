import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import AppointmentInfo from "./AppointmentInfo";

function RenterRentalList({ appointmentList }) {
    const [appointments, setAppointments] = useState([])
    const [rentals, setRentals] = useState([])

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
      }, []);

    function handleDelete(target) {
        const filteredList = appointments.filter(appointment => {
            return target.id !== appointment.id
        })

        setAppointments(filteredList)
    }

    console.log(rentals)
    const rentalCards = appointments.map(appointment => {
        const rental = rentals.filter(rental => rental.id === appointment.rental_id)[0]
        console.log(rentals)

        if (rentals) {
           return(
            <Card
                key={appointment.id}
                image={rental.image}
                header={`Appointment on: ${appointment.start_date}`}
                meta={`Address: ${rental.address}`}
                extra={<AppointmentInfo id={appointment.id} onDelete={handleDelete}/>}
            />
        ) 
        }else {
            return
        }
        
    })

    return(
        <div>
            {rentalCards}
        </div>
    )
}

export default RenterRentalList