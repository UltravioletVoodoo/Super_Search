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
      {searchResults.length > 0 && (
        <div className="searchResultsContainer">
          <SearchResults searchResults={searchResults} />
        </div>
      )}
      {typeof(searchResults) !== 'string' && searchResults.length === 0 && (
        <div className='searchResultsContainer'>
          <h1>No results found...</h1>
          <p>Try changing the search parameters above</p>
        </div>
      )}
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
        position: relative;
        width: 735px;
        height: 450px;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 50px;
      }
      .searchResultsContainer {
        display: block;
        position: relative;
        width: 735px;
        left: calc((50vw - 16px) - 366px);
      }
      `}</style>
    </>
  )
}
