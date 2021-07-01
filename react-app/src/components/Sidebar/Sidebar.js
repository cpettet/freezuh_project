import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import PlateForm from "./Forms/PlateForm";
import SampleForm from "./Forms/SampleForm";
import SidebarSampleShow from "./Shows/SidebarSampleShow";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Switch>
        <Route path="/samples/new">
          <SampleForm />
        </Route>
        <Route exact path="/samples/:sampleId">
          <SidebarSampleShow />
        </Route>
        <Route path="/samples/:sampleId/edit">
          <h1>You made it to the edit page</h1>
        </Route>
        <Route path="/plates/new">
          <PlateForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;