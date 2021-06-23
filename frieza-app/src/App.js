import Navigation from "./components/Navigation";
import Freezers from "./components/Freezers";
import Racks from "./components/Racks";
import Boxes from "./components/Boxes";
import Plates from "./components/Plates";
import Samples from "./components/Samples"
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
        <Route exact path="/racks">
          <Racks />
        </Route>
        <Route exact path="/boxes">
          <Boxes />
        </Route>
        <Route exact path="/plates">
          <Plates />
        </Route>
        <Route exact path="/samples">
          <Samples />
        </Route>
      </Switch>
    </>
  );
}

export default App;
