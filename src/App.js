// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import Title from "./Components/Title";
import RentalList from "./Components/main-content/RentalList";
import HostInfo from "./Components/main-content/HostInfo";
import HostForm from "./Components/main-content/HostForm";
import RentalForm from "./Components/main-content/RentalForm";
import RenterUser from "./Components/RenterUser";
import HostUser from "./Components/HostUser";
import RenterForm from "./Components/rental_components/RenterForm";
import RenterInfo from "./Components/rental_components/RenterInfo";
import RenterPage from "./Components/rental_components/RenterPage";
import Reserve from "./Components/rental_components/Reserve";

function App() {
  return (
    <div className="App">
      <Title />
      <Switch>
        {/* Shared */}
        <Route exact path="/">
          <HostUser />
        </Route>
        <Route exact path="/renter/portal">
          <RenterUser />
        </Route>
        {/* Host Routes */}
        <Route exact path="/rentals/host">
          <RentalList />
        </Route>
        <Route exact path="/hostinfo">
          <HostInfo />
        </Route>
        <Route exact path="/hostform">
          <HostForm />
        </Route>
        <Route exact path="/rentalform/host/:host_id">
          <RentalForm />
        </Route>
        <Route exact path="/rentalform/:rental_id">
          <RentalForm />
        </Route> 
        {/* Renter Routes */}
        <Route exact path="/renterpage">
          <RenterPage />
        </Route>
        <Route exact path="/renterinfo">
          <RenterInfo />
        </Route>
        <Route exact path="/renterform">
          <RenterForm />
        </Route>
        {/* Appointment add route */}
        <Route exact path="/reserve/rental/:rental_id">
          <Reserve />
        </Route>
        {/* Appointment edit route */}
        <Route exact path="/reserve/:apmt_id">
          <Reserve />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
