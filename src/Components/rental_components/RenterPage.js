import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { Button, Icon, Popup } from "semantic-ui-react";
import FullRentalList from "./FullRentalList";
import RenterRentalList from "./RenterRentalList";

function RenterPage() {
    const [renter, setRenter] = useState({
        name: ""
    })
    const [cardToggle, setCardToggle] = useState(true)

    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:3000/renters/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
        .then((resp) => resp.json())
        .then(queriedRenter => {
            console.log(queriedRenter);
            setRenter(queriedRenter);
        });
    },[])

    function logOff() {
        localStorage.token = ""
        history.push("/")
    }

    return(
        <div>
            <p>
                Welcome! <Link to="/renterinfo"> {renter.name} </Link>
                <Popup content="Log Off" trigger={<Icon name="power" onClick={() => logOff()} />} />
            </p>
            <Button onClick={() => setCardToggle(!cardToggle)}>
                {cardToggle ? "All" : "Appointments"}
            </Button>
            {cardToggle ? 
                <div>
                    <h4>Available Rentals:</h4>
                    <FullRentalList />
                </div>    
                :
                <div>
                    <h4>Scheduled Appointments:</h4>
                    <RenterRentalList appointmentList={renter.appointments}/>
                </div>
                    
            }
        </div>
    )
}

export default RenterPage