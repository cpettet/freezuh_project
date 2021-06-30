import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import PlateForm from "./Forms/PlateForm";
import SampleForm from "./Forms/SampleForm";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div>Hello, inside the sidebar div #1</div>
      <div>Inside sidebar div #2</div>
      <Switch>
        <Route path="/samples/new">
          <SampleForm />
        </Route>
        <Route path="/plates/new">
          <PlateForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;