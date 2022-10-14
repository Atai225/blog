import React from "react";
import {
  BsSortNumericDown,
  BsSortNumericDownAlt,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
} from "react-icons/bs";
import "./Search.css";

function Search({ filterByA, search, isReversedA, isReversedB, filterByB }) {
  return (
    <div className="head-part">
      <div className="search-box">
        <input
          className="search"
          placeholder="Search"
          type="tel"
          onChange={search}
        />
      </div>
      <div className="sort">
        <button onClick={filterByA} className="sort__btn">
          {isReversedA ? <BsSortNumericDownAlt /> : <BsSortNumericDown />}
        </button>
        <button onClick={filterByB} className="sort__btn">
          {isReversedB ? <BsSortAlphaDown /> : <BsSortAlphaDownAlt />}
        </button>
      </div>
    </div>
  );
}

export default Search;
