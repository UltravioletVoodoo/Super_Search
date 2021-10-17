import Base from '../components/base'
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

export default function Index() {

  const [searchResults, setSearchResults] = useState("");

  return (
    <>
      <Base />
      <h1 className="title">Super Search</h1>
      <span className="babylove">secret baby edition</span>
      <SearchInput setter={setSearchResults} />
      <SearchResults searchResults={searchResults} />
      <style jsx>{`
      .title {
        display: inline-block;
      }
      .babylove {
        padding-left: 10px;
        font-size: 14px;
        color: lightgray;
        display: inline-block;
      }
      `}</style>
    </>
  )
}
