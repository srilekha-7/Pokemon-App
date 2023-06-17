import React, { useState } from "react";

import "./Details.css";
function Details(props) {
  const { pokeDetails, pokeData, addingBookmark, increasingCount } = props;
  //   console.log(pokeDetails);
  let favourite =
    "https://cdn-icons-png.flaticon.com/512/12/12783.png?w=740&t=st=1686829470~exp=1686830070~hmac=41b96b4fd0f0040837356c4c94c2728673636850174668da16930dea33dcfed1";

  let addFavourite =
    "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png";
  const [favImg, setFavImg] = useState(favourite);

  const changeFavImage = () => {
    setFavImg(addFavourite);
  };

  // const addToBookmark = () => {
  //   const newBookmark = bookmark.concat(pokeDetails);
  //   setBookmark(newBookmark);
  //   console.log(bookmark);
  // };

  if (typeof pokeDetails === "undefined") {
    return <h2 className="poke-name-2">Select one Character</h2>;
  } else {
    return (
      <div className="details" key={pokeDetails.id}>
        <div className="contents">
          <h1 className="poke-name-3">{pokeDetails.name}</h1>
          <img src={pokeDetails.sprites.front_default} alt="" />
          <div className="abilities">
            {pokeDetails.abilities.map((eachAbility) => {
              return (
                <p className="abilities-button">{eachAbility.ability.name}</p>
              );
            })}
          </div>
          {pokeDetails.stats.map((eachStat) => {
            return (
              <p className="poke-name-3">
                {eachStat.stat.name} : {eachStat.base_stat}
              </p>
            );
          })}

          <div
            className="bookmark-button"
            key={pokeDetails.id}
            className="bookmark"
            onClick={() => {
              addingBookmark(pokeDetails);
            }}
          >
            <p className="poke-name-3">Favourite</p>
          </div>
          <p className="poke-name-3">Click to add to favourites</p>
        </div>
      </div>
    );
  }
}

export default Details;
