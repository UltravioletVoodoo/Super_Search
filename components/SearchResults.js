import React, { useState } from 'react';
import SearchResult from '../components/SearchResult';

export default function SearchResults(props) {
    const { searchResults } = props;

    const syllableSections = [
        [], //1
        [], //2
        [], //3
        [], //4
        [], //5
        [], //6
        [], //7    
        []  //8+
    ];

    for (let x = 0; x < searchResults.length; x++) {
        const index = searchResults[x].numSyllables - 1 < syllableSections.length ? searchResults[x].numSyllables - 1 : syllableSections.length - 1;
        syllableSections[index].push(<SearchResult key={x} word={searchResults[x]} />);
    }


    return (
        <>
            <div className="resultsContainer">
                <div className="resultsPadding">
                    {syllableSections[0].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">1 Syllables</p>
                            {syllableSections[0]}
                        </div>
                    )}
                    {syllableSections[1].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">2 Syllables</p>
                            {syllableSections[1]}
                        </div>
                    )}
                    {syllableSections[2].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">3 Syllables</p>
                            {syllableSections[2]}
                        </div>
                    )}
                    {syllableSections[3].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">4 Syllables</p>
                            {syllableSections[3]}
                        </div>
                    )}
                    {syllableSections[4].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">5 Syllables</p>
                            {syllableSections[4]}
                        </div>
                    )}
                    {syllableSections[5].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">6 Syllables</p>
                            {syllableSections[5]}
                        </div>
                    )}
                    {syllableSections[6].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">7 Syllables</p>
                            {syllableSections[6]}
                        </div>
                    )}
                    {syllableSections[7].length > 0 && (
                        <div className="syllableSection">
                            <p className="syllableSectionHeader">8+ Syllables</p>
                            {syllableSections[7]}
                        </div>
                    )}     
                </div>
            </div>
            
            <style jsx>{`
                .resultsContainer {
                    background-color: #e8a372;
                    width: 100%;
                    border: 2px solid black;
                    border-radius: 10px;
                }
                .resultsPadding {
                    margin: 25px;
                }
                .syllableSectionHeader {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 10px 0 10px 5px;
                }
            `}</style>
        </>
    )
}