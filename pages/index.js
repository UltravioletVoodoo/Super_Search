import Base from '../components/base'
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import { phoneSize, tabletSize } from '../util/globalContants';

export default function Index() {

  const [searchResults, setSearchResults] = useState("");

  return (
    <>
      <Base />
      <div className="titleContainer">
        <h1 className="title">Super Search</h1>
      </div>
      <div className="leftContainer container">
        <div className="adslot_margin"></div>
      </div>
      <div className="centerContainer container">
        <div className="searchResults_Container">
          <SearchInput setter={setSearchResults} />
        </div>
      </div>
      <div className="rightContainer container">
        <div className="adslot_margin"></div>
      </div>
      <SearchResults searchResults={searchResults} />
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
      }
      .leftContainer {
        width: 20%;
        left: 0;
        background-color: gray;
      }
      .centerContainer {
        width: 60%;
      }
      .rightContainer {
        width: 20%;
        right: 0;
        background-color: pink;
      }
      .adslot_margin {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 100px;
        height: 400px;
        background-color: green;
      }
      .searchResults_Container {
        display: inline-block;
        position: absolute;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
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
