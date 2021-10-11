import Base from '../components/base'
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

export default function Index() {

  const [searchResults, setSearchResults] = useState("");

  return (
    <>
      <Base />
      <h1>Super Search</h1>
      <SearchInput setter={setSearchResults} />
      <SearchResults searchResults={searchResults} />
    </>
  )
}
