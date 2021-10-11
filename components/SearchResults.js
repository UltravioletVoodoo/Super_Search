import React, { useState } from 'react';
import SearchResult from '../components/SearchResult';

export default function SearchResults(props) {
    const { searchResults } = props;

    let resultComponents = [];
    for (let x = 0; x < searchResults.length; x++) {
        resultComponents.push(<SearchResult key={x} word={searchResults[x]} />);
    }


    return (
        <>
            {resultComponents}
        </>
    )
}