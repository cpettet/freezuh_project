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
import SampleShow from "./components/SampleShow";
import Sidebar from "./components/Sidebar";

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
          <Route exact path="/">
            <div className="body">Welcome</div>
          </Route>
          <ProtectedRoute exact path="/freezers">
            <Freezers />
          </ProtectedRoute>
          <ProtectedRoute exact path="/racks">
            <Racks />
          </ProtectedRoute>
          <ProtectedRoute exact path="/boxes">
            <Boxes />
          </ProtectedRoute>
          <ProtectedRoute exact path="/plates">
            <Plates />
          </ProtectedRoute>
          <ProtectedRoute exact path="/samples">
            <SampleShow />
          </ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
