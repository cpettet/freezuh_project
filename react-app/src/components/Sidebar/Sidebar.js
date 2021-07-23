import React, { useState } from "react";
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
import SidebarEmpty from "./SidebarEmpty/SidebarEmpty";
import AssignToPlate from "./Assignments/AssignToPlate";
import AssignToRack from "./Assignments/AssignToRack";
import AssignToFreezer from "./Assignments/AssignToFreezer";
import About from "./About";

function Sidebar() {
  const [sidebarShow, setSidebarShow] = useState(true);

  const toggleSidebar = (e) => setSidebarShow((prev) => !prev);

  return (
    <>
          {/* <button onClick={toggleSidebar}>{"<"}</button> */}
      <div
        className={
          sidebarShow
          ? `${style.sidebar}`
          : `${style.sidebar} ${style["sidebar-hidden"]}`
        }
      >
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
          <Route path="/plates/:plateId/edit">
            <PlateEdit />
          </Route>
          <Route path="/plates/:plateId/well-:wellId">
            <AssignToPlate />
          </Route>
          <Route path="/plates/:plateId">
            <SidebarPlateShow />
          </Route>
          <Route path="/racks/new">
            <RackForm />
          </Route>
          <Route path="/racks/:rackId/edit">
            <RackEdit />
          </Route>
          <Route path="/racks/:rackId/rack-position-:rackPosition">
            <AssignToRack />
          </Route>
          <Route exact path="/racks/:rackId">
            <SidebarRackShow />
          </Route>
          <Route path="/freezers/new">
            <FreezerForm />
          </Route>
          <Route path="/freezers/:freezerId/edit">
            <FreezerEdit />
          </Route>
          <Route path="/freezers/:freezerId/freezer-position-:freezerPosition">
            <AssignToFreezer />
          </Route>
          <Route exact path="/freezers/:freezerId">
            <SidebarFreezerShow />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <SidebarEmpty />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Sidebar;
