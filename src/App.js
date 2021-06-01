// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./Components/Header";
import Login from "./Components/Login";
import RentalList from "./Components/RentalList";
import SignUp from "./Components/SignUp";
import HostInfo from "./Components/HostInfo";
import HostForm from "./Components/HostForm";
import RentalInfo from "./Components/RentalInfo";
import RentalForm from "./Components/RentalForm";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/rentals">
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
        <Route exact path="/rentalform">
          <RentalForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
