import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import Boxes from "../Boxes";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div>Hello, inside the sidebar div #1</div>
      <div>Inside sidebar div #2</div>
      <Switch>
        <Route exact path="/login">
          This is the sidebar at the /login route.
        </Route>
        <Route exact path="/freezers">
          <Boxes />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;