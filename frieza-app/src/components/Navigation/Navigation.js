import { NavLink, Link } from "react-router-dom";
import style from "./Navigation.module.css";
import logo from "./Freezer-Final.min.svg";
import Select from "react-dropdown-select"

function Navigation() {
  // const freezers = [
  //   {"name": "FZR0001", "id": 1},
  //   {"name": "FZR0002"},
  //   {"name": "FZR0003"},
  //   {"name": "FZR0004"},
  //   {"name": "FZR0567"},
  //   {"name": "FZR0223"},
  //   {"name": "FZR0483"},
  // ]

  const freezers = [
    { name: "FZR0001", id: 1 },
    { name: "FZR0432", id: 432 },
    { name: "FZR0223", id: 223 },
    { name: "FZR0111", id: 111 },
    { name: "FZR0431", id: 431 },
    { name: "FZR0789", id: 789 },
  ];

  return (
    <nav className={style.navbar}>
      <div className={style.navbar__upper}>
        <div className={style.navbar__upper__logo}>
          <Link to="/">
            <img src={logo} alt="logo" className={style.logo} />
          </Link>
        </div>
        <div className={style.navbar__upper__links}>
          <NavLink exact to="/" activeClassName={style["link-selected"]}>
            Home
          </NavLink>
          <NavLink to="/freezers" activeClassName={style["link-selected"]}>
            Freezers
          </NavLink>
          <NavLink to="/racks" activeClassName={style["link-selected"]}>
            Racks
          </NavLink>
          <NavLink to="/boxes" activeClassName={style["link-selected"]}>
            Boxes
          </NavLink>
          <NavLink to="/plates" activeClassName={style["link-selected"]}>
            Plates
          </NavLink>
          <NavLink to="/samples" activeClassName={style["link-selected"]}>
            Samples
          </NavLink>
        </div>
        <div className={style.navbar__upper__profile}>
          <h3>Profile</h3>
        </div>
      </div>
      <div className={style.navbar__lower}>
        <Select
          options={freezers}
          clearable={true}
          onChange={(value) => console.log(value)}
          labelField="name"
          separator={true}
          searchBy="id"
          keepSelectedInList={true}
          dropdownHeight="200px"
          placeholder="Search by Freezer ID"
        />
      </div>
    </nav>
  );
}

export default Navigation;
