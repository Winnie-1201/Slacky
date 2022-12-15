import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearch } from "../store/search";
import "./NavBarSearch.css";

const NavBarSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // const res = await dispatch(getSearch(keyword));
    // if (res) {
    history.push(`/search/${keyword}`);
    //}
    history.push(`/search/${keyword}`);
    //}
    setKeyword("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="search-navbar">
        <div className="serach_input_contanier">
          <input
            placeholder="Search for messages"
            className="nav_bar_search"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <button type="submit" className="searchBar-button">
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NavBarSearch;
