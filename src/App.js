import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./Components/Header";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
