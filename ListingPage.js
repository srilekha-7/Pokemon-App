import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListingPage.css";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import Details from "./Details";
// import "react-loader-spinner/dist/loader/css/react-loader-spinner.css";
function ListingPage() {
  const [pokeData, setPokeData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDetails, setPokeDetails] = useState(pokeData[0]);
  const [bookmark, setBookmark] = useState([]);
  const [present, setPresent] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // console.log(pokeDetails);
  const fetchData = async () => {
    setLoader(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoader(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);

      // console.log(result.data);

      setPokeData((state) => {
        state = [...state, result.data];

        // console.log(state);

        const filteredSate = state.reduce((acc, current) => {
          if (!acc.find((item) => item.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);

        setPokeData(filteredSate);
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  // console.log(pokeData);
  // console.log(pokeDetails);
  useEffect(() => {
    fetchData();
  }, [url]);
  const onSetDetails = (id) => {
    const selectedDetail = pokeData.filter((value) => value.id === id);

    setPokeDetails(selectedDetail[0]);
    // console.log(pokeDetails);
  };

  // const typeOfPokeDetails = typeof pokeDetails;
  // console.log(typeOfPokeDetails);
  const addingBookmark = (bookmarkEl) => {
    setBookmark((state) => {
      state = [...state, bookmarkEl];

      const filteredSate = state.reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setBookmark(filteredSate);

      return state;

      console.log(bookmark);
    });

    const newBookmark = bookmark.concat(bookmarkEl);
    setBookmark(newBookmark);
    console.log(bookmark);
  };
  const increasingCount = (id) => {
    const matched = pokeData.filter((eachData) => eachData.id === id);
    setPresent(true);
    setBookmarkCount(present ? bookmarkCount + 1 : bookmarkCount);
    // setBookmarkCount(bookmarkCount + 1);
    // console.log(bookmarkCount);

    console.log(bookmarkCount);
  };

  // console.log(pokeData);
  return (
    <div className="card-container-2">
      <div className="top-section">
        <h2 className="poke-name">Pokemon Characters</h2>
        <Link to="/">
          <button className="listing-page-button">Home</button>
        </Link>
        <Link to="/bookmark" state={{ bookmark: bookmark }}>
          <button className="listing-page-button">Bookmark</button>
        </Link>
      </div>

      <div className="listing-card">
        <div className="listing-container">
          {loader ? (
            <div className="loader">
              <Rings
                height="80"
                width="80"
                color="#5ee85c"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            </div>
          ) : (
            pokeData.map((item) => {
              return (
                <div
                  className="poke-each-card"
                  key={item.id}
                  onClick={() => {
                    onSetDetails(item.id);
                  }}
                >
                  <h2>{item.id}</h2>
                  <img src={item.sprites.front_default} alt="" />
                  <h2>{item.name}</h2>
                </div>
              );
            })
          )}

          <div>
            <button
              className="listing-page-button"
              onClick={() => {
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
            <button
              className="listing-page-button"
              onClick={() => {
                setUrl(nextUrl);
              }}
            >
              next
            </button>
          </div>
        </div>
        <div className="details-card">
          <Details
            pokeDetails={pokeDetails}
            pokeData={pokeData}
            addingBookmark={addingBookmark}
            increasingCount={increasingCount}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
