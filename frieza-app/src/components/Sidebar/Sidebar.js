import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import Freezers from "../Freezers";
import Boxes from "../Boxes";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div>Hello, inside the sidebar div #1</div>
      <div>Inside sidebar div #2</div>
      <Switch>
        <Route path="/boxes">
          <Boxes />
        </Route>
        <Route path="/freezers">
          <Freezers />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;