import { useEffect, useState } from "react"
import { Card } from "semantic-ui-react";
import RenterRentalInfo from "./RenterRentalInfo";

function FullRentalList() {
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/rentals", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp) => resp.json())
        .then(queriedRentals => {
            console.log(queriedRentals);
            setRentals(queriedRentals);
        });
    },[])

    const rentalCards = rentals.map(rental => {
        return(
            <Card
                key={rental.id}
                image={rental.image}
                header={rental.address}
                meta={`Max guests: ${rental.max_guests}`}
                extra={<RenterRentalInfo id={rental.id}/>}
            />
        )
    })

    return(
        <Card.Group className="custom">
            {rentalCards}
        </Card.Group >
    )
}

export default FullRentalList