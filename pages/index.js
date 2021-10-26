import Base from '../components/base'
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import { phoneSize, tabletSize } from '../util/globalContants';
import Adslot from '../components/adslot';

export default function Index() {

  const [searchResults, setSearchResults] = useState("");

  return (
    <>
      <Base />
      <div className="titleContainer">
        <h1 className="title">Super Search</h1>
      </div>
      <div className="leftContainer container">
        <Adslot type="vertical" />
      </div>
      <div className="centerContainer container">
        <div className="searchInputContainer">
          <SearchInput setter={setSearchResults} />
        </div>
      </div>
      <div className="rightContainer container">
        <Adslot type="vertical" />
      </div>
      <div className="lowerContainer">
        <Adslot type="horizontal" />
      </div>
      <div className="leftContainer container">
        <Adslot type="vertical" />
      </div>
      <div className="centerContainer container">
        <div className="searchResultsContainer">
          <SearchResults searchResults={searchResults} />
        </div>
      </div>
      <div className="rightContainer container">
        <Adslot type="vertical" />
      </div>
      <div className="lowerContainer">
        <Adslot type="horizontal" />
      </div>
      <style jsx>{`
      .titleContainer {
        position: relative;
        display: block;
        width: 100%;
        text-align: center;
      }
      .title {
        font-size: 36px;
      }
      .container {
        display: inline-block;
        position: relative;
        height: 400px;
      }
      .leftContainer {
        width: 20%;
        left: 0;
      }
      .centerContainer {
        width: 60%;
      }
      .rightContainer {
        width: 20%;
        right: 0;
      }
      .lowerContainer {
        position: relative;
        display: block;
        width: 100%;
        height: 100px;
        padding: 10px 0 10px 0;
      }
      .searchInputContainer {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .searchResultsContainer {
        display: block;
        position: absolute;
        width: 100%;
      }
      @media only screen and (max-width: ${phoneSize}px) {
        .adslot_margin {
          display: none;
        }
        .leftContainer, .rightContainer {
          display: none;
        }
        .centerContainer {
          width: 100%;
        }
      }
      `}</style>
    </>
  )
}
