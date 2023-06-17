import React, { useState } from "react";
import "./Bookmark.css";
import { Link, useLocation } from "react-router-dom";

// useEffect(() => {
//   console.log(location);
// }, []);

function Bookmark(props) {
  const location = useLocation();
  // console.log(location);
  const bookmarkElements = location.state.bookmark;
  console.log(bookmarkElements);
  const [bookEl, setBookEl] = useState(bookmarkElements);

  const removeFavourite = (id) => {
    const removeEl = bookEl.filter((eachEl) => eachEl.id !== id);
    setBookEl(removeEl);
  };

  if (typeof bookEl === "undefined" || bookEl.length === 0) {
    return <h2 className="poke-name-2">No Favourite Character</h2>;
  } else {
    return (
      <div className="card-container-3">
        <Link to="/">
          <button className="listing-page-button">Home</button>
        </Link>
        <Link to="/listing-page">
          <button className="listing-page-button">Listing Page</button>
        </Link>
        {bookEl.map((eachBookmark) => {
          // console.log(eachBookmark);
          return (
            <div>
              <div className="details-2">
                <h2 className="poke-name-3">{eachBookmark.name}</h2>
                <img src={eachBookmark.sprites.front_default} alt="" />
                <div className="abilities">
                  {eachBookmark.abilities.map((eachAbility) => {
                    return (
                      <p className="abilities-button">
                        {eachAbility.ability.name}
                      </p>
                    );
                  })}
                </div>
                {eachBookmark.stats.map((eachStat) => {
                  return (
                    <p className="poke-name-3">
                      {eachStat.stat.name} : {eachStat.base_stat}
                    </p>
                  );
                })}
                <button
                  className="abilities-button"
                  onClick={() => removeFavourite(eachBookmark.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Bookmark;
