import React from "react"
import style from "./SidebarEmpty.module.css"

function SidebarEmpty() {
    return (
      <div className={style.sidebar__container}>
        <h3 className={style.sidebar__header}>Nothing to see here!</h3>
        <p>
          Click on a freezer, rack, plate, or sample to see more information!
          You can also edit or delete any object.
        </p>
        <p>
          Create a new freezer, rack, plate, or sample to see the creation form.
        </p>
      </div>
    );
}

export default SidebarEmpty;