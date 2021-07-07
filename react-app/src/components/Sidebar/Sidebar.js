import React from "react";
import { Switch, Route } from "react-router";
import style from "./Sidebar.module.css";
import PlateForm from "./Forms/PlateForm";
import SampleForm from "./Forms/SampleForm";
import RackForm from "./Forms/RackForm";
import FreezerForm from "./Forms/FreezerForm";
import SidebarSampleShow from "./Shows/SidebarSampleShow";
import SidebarPlateShow from "./Shows/SidebarPlateShow";
import SidebarRackShow from "./Shows/SidebarRackShow";
import SidebarFreezerShow from "./Shows/SidebarFreezerShow";
import SampleEdit from "./Forms/SampleEdit";
import PlateEdit from "./Forms/PlateEdit";
import RackEdit from "./Forms/RackEdit";
import FreezerEdit from "./Forms/FreezerEdit";

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
        <Route path="/racks/new">
          <RackForm />
        </Route>
        <Route exact path="/racks/:rackId">
          <SidebarRackShow />
        </Route>
        <Route path="/racks/:rackId/edit">
          <RackEdit />
        </Route>
        <Route path="/freezers/new">
          <FreezerForm />
        </Route>
        <Route exact path="/freezers/:freezerId">
          <SidebarFreezerShow />
        </Route>
        <Route path="/freezers/:freezerId/edit">
          <FreezerEdit />
        </Route>
      </Switch>
    </div>
  );
}

export default Sidebar;
