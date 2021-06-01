// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./Components/Header";
import Login from "./Components/Login";
import RentalList from "./Components/RentalList";
import SignUp from "./Components/SignUp";
import HostInfo from "./Components/HostInfo";

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
        <Route exact path="/host#info">
          <HostInfo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
