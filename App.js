import React from "react";

import Home from "./components/Home";
import ListingPage from "./components/ListingPage";
import Bookmark from "./components/Bookmark";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/listing-page" Component={ListingPage} />
          <Route exact path="/bookmark" Component={Bookmark} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
