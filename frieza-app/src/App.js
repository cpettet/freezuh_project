import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/Authorization/LoginForm"
import SignUpForm from "./components/Authorization/SignUpForm"
import ProtectedRoute from "./components/Authorization/ProtectedRoute";
import Freezers from "./components/Freezers";
import Racks from "./components/Racks";
import Boxes from "./components/Boxes";
import Plates from "./components/Plates";
import Samples from "./components/Samples";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path="/">
          Welcome
        </Route>
        <Route exact path="/freezers">
          <Freezers />
        </Route>
        <ProtectedRoute exact path="/racks">
          <Racks />
        </ProtectedRoute>
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
    </BrowserRouter>
  );
}

export default App;
