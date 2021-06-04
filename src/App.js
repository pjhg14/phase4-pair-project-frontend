// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import Title from "./Components/Title";
import RentalList from "./Components/main-content/RentalList";
import HostInfo from "./Components/main-content/HostInfo";
import HostForm from "./Components/main-content/HostForm";
import RentalInfo from "./Components/main-content/RentalInfo";
import RentalForm from "./Components/main-content/RentalForm";
import RenterUser from "./Components/RenterUser";
import HostUser from "./Components/HostUser";

function App() {
  return (
    <div className="App">
      <Title />
      <Switch>
        <Route exact path="/">
          <HostUser />
        </Route>
        <Route exact path="/renter/portal">
          <RenterUser />
        </Route>
        <Route exact path="/rentals/:type">
          <RentalList />
        </Route>
        <Route exact path="/hostinfo">
          <HostInfo />
        </Route>
        <Route exact path="/hostform">
          <HostForm />
        </Route>
        <Route exact path="/rentalinfo/:id">
          <RentalInfo />
        </Route>
        <Route exact path="/rentalform/host/:host_id">
          <RentalForm />
        </Route>
        <Route exact path="/rentalform/:rental_id">
          <RentalForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
