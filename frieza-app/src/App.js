import Navigation from "./components/Navigation";
import Freezers from "./components/Freezers";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/freezers">
          <Freezers />
        </Route>
      </Switch>
    </>
  );
}

export default App;
