import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import PlateForm from "./Forms/PlateForm";
import SampleForm from "./Forms/SampleForm";
import SidebarSampleShow from "./Shows/SidebarSampleShow";
import SidebarPlateShow from "./Shows/SidebarPlateShow/SidebarPlateShow";
import SampleEdit from "./Forms/SampleEdit/SampleEdit";
import PlateEdit from "./Forms/PlateEdit/PlateEdit";

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
          <SampleEdit />
        </Route>
        <Route path="/plates/new">
          <PlateForm />
        </Route>
        <Route exact path="/plates/:plateId">
          <SidebarPlateShow />
        </Route>
        <Route path="/plates/:plateId/edit">
          <PlateEdit />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;