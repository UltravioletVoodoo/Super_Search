import Base from '../components/base'
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

export default function Index() {

  const [searchResults, setSearchResults] = useState("");

  return (
    <>
      <Base />
      <div className="titleContainer">
        <h1 className="title">Super Search</h1>
      </div>
      <div className="searchInputContainer">
        <SearchInput setter={setSearchResults} />
      </div>
      <div className="searchResultsContainer">
        <SearchResults searchResults={searchResults} />
      </div>
      <style jsx>{`
      .titleContainer {
        position: relative;
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 80px;
      }
      .title {
        font-size: 60px;
        font-family: cursive;
        font-weight: normal;
      }
      .searchInputContainer {
        display: block;
        position: fixed;
        width: 735px;
        height: 450px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .searchResultsContainer {
        display: block;
        position: fixed;
        width: 735px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 50%);
      }
      `}</style>
    </>
  )
}
