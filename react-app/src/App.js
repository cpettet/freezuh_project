import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/Authorization/LoginForm"
import SignUpForm from "./components/Authorization/SignUpForm"
import ProtectedRoute from "./components/Authorization/ProtectedRoute";
import FreezerShow from "./components/FreezerShow";
import RackShow from "./components/RackShow";
import PlateShow from "./components/PlateShow";
import SampleShow from "./components/SampleShow";
import Sidebar from "./components/Sidebar";
import PlateZoom from "./components/PlateZoom/PlateZoom";
import RackZoom from "./components/RackZoom/RackZoom";
import FreezerZoom from "./components/FreezerZoom";
import About from "./components/About";
import Splash from "./components/Splash";

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
      <div className="main">
        <Sidebar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/plates/:plateId(\d+)">
            <PlateZoom />
          </ProtectedRoute>
          <ProtectedRoute path="/racks/:rackId(\d+)">
            <RackZoom />
          </ProtectedRoute>
          <ProtectedRoute path="/freezers/:freezerId(\d+)">
            <FreezerZoom />
          </ProtectedRoute>
          <ProtectedRoute path="/plates">
            <PlateShow />
          </ProtectedRoute>
          <ProtectedRoute path="/racks">
            <RackShow />
          </ProtectedRoute>
          <ProtectedRoute path="/samples">
            <SampleShow />
          </ProtectedRoute>
          <ProtectedRoute path="/freezers">
            <FreezerShow />
          </ProtectedRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Splash />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
