import React, { useState } from 'react';

export default function SearchInput(props) {
    const { setter } = props;

    const [searchString, setSearchString] = useState("")

    function getSearchResults() {
        var request = new XMLHttpRequest()
        request.open('GET', searchString, true)
        request.onload = function () {
            // Begin accessing JSON data here
            setter(JSON.parse(request.response));
        }
        request.send()
    }

    function handleSearchChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setSearchString(newValue)
    }

    return (
        <>
            <p>Search area</p>
            <input type="text" value={searchString} onChange={handleSearchChange}></input>
            <button onClick={getSearchResults}>Search</button>
        </>
    )
}