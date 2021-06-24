import { NavLink, Link } from "react-router-dom";
import style from "./Navigation.module.css";
import logo from "./Freezer-Final.min.svg";
import Select from "react-dropdown-select";

function Navigation() {
  const demo_freezers = [
    { name: "FZR0001", id: 1 },
    { name: "FZR0432", id: 432 },
    { name: "FZR0223", id: 223 },
    { name: "FZR0111", id: 111 },
    { name: "FZR0431", id: 431 },
    { name: "FZR0789", id: 789 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <nav className={style.navbar}>
      <div className={style.navbar__upper}>
        <div className={style.navbar__upper__logo}>
          <Link to="/">
            <img src={logo} alt="logo" className={style.logo} />
          </Link>
        </div>
        <div className={style.navbar__upper__links}>
          <NavLink exact to="/" className={style.link} activeClassName={style["link-selected"]}>
            Home
          </NavLink>
          <NavLink to="/freezers" className={style.link} activeClassName={style["link-selected"]}>
            Freezers
          </NavLink>
          <NavLink to="/racks" className={style.link} activeClassName={style["link-selected"]}>
            Racks
          </NavLink>
          <NavLink to="/boxes" className={style.link} activeClassName={style["link-selected"]}>
            Boxes
          </NavLink>
          <NavLink to="/plates" className={style.link} activeClassName={style["link-selected"]}>
            Plates
          </NavLink>
          <NavLink to="/samples" className={style.link} activeClassName={style["link-selected"]}>
            Samples
          </NavLink>
        </div>
        <div className={style.navbar__upper__profile}>
          <h3>Profile</h3>
        </div>
      </div>
      <form className={style.navbar__lower} onSubmit={handleSubmit}>
        <div className={style["select-box"]}>
          <Select
            options={demo_freezers}
            clearable={true}
            onChange={(value) => console.log(value)}
            labelField="name"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Freezer ID"
            className={style["select-box"]}
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            options={demo_freezers}
            clearable={true}
            onChange={(value) => console.log(value)}
            labelField="name"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Rack ID"
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            options={demo_freezers}
            clearable={true}
            onChange={(value) => console.log(value)}
            labelField="name"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Box ID"
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            options={demo_freezers}
            clearable={true}
            onChange={(value) => console.log(value)}
            labelField="name"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Plate ID"
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            options={demo_freezers}
            clearable={true}
            onChange={(value) => console.log(value)}
            labelField="name"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Sample ID"
          />
        </div>
        <button className={style.submit}>GO</button>
      </form>
    </nav>
  );
}

export default Navigation;
