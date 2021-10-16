import React, { useState } from 'react';
import arrayContains from '../util/arrayContains';

export default function SearchInput(props) {
    const { setter } = props;

    const numResults = 5;

    const [searchOjbect, setSearchObject] = useState({
        noun: false,
        verb: false,
        adjective: false,
        adverb: false,
        useSyllables: false,
        syllables: 2,
        startsWith: "",
        endsWith: "",
        rymesWith: "",
        similarTo: ""
    })

    function generateAPICall() {
        let result = 'https://api.datamuse.com/words?md=dsp&max=900';
        if (searchOjbect.startsWith.length > 0) {
            if (searchOjbect.endsWith.length > 0) {
                result += `&sp=${searchOjbect.startsWith}*${searchOjbect.endsWith}`
            }
            result += `&sp=${searchOjbect.startsWith}*`
        } else {
            if (searchOjbect.endsWith.length > 0) {
                result += `&sp=*${searchOjbect.endsWith}`
            }
        }
        if (searchOjbect.rymesWith.length > 0) {
            result += `&rel_rhy=${searchOjbect.rymesWith}`
        }
        if (searchOjbect.similarTo.length > 0) {
            result += `&ml=${searchOjbect.similarTo}`
        }
        return result;
    }

    function stripData(dataWords) {
        let strippedData = [];
        for (let dataWord of dataWords) {
            if (strippedData.length >= numResults) break;
            if (!searchOjbect.noun && arrayContains(dataWord.tags, 'n')) continue;
            if (!searchOjbect.verb && arrayContains(dataWord.tags, 'v')) continue;
            if (!searchOjbect.adjective && arrayContains(dataWord.tags, 'adj')) continue;
            if (!searchOjbect.adverb && arrayContains(dataWord.tags, 'adv')) continue;
            if (searchOjbect.useSyllables) {
                if (searchOjbect.syllables != dataWord.numSyllables) continue;
            }
            strippedData.push(dataWord);
        }
        return strippedData;
    }
    
    function getSearchResults() {
        var request = new XMLHttpRequest()
        request.open('GET', generateAPICall(), true)
        request.onload = function () {
            // Begin accessing JSON data here
            const APIResponse = JSON.parse(request.response);
            if (APIResponse != null) {
                setter(stripData(JSON.parse(request.response)));
            } else {
                console.log("No data");
            }

        }
        request.send()
    }

    function handleNounChange() {
        let result = {... searchOjbect};
        result.noun = !result.noun;
        setSearchObject(result);
    }

    function handleVerbChange() {
        let result = {... searchOjbect};
        result.verb = !result.verb;
        setSearchObject(result);
    }

    function handleAdjectiveChange() {
        let result = {... searchOjbect};
        result.adjective = !result.adjective;
        setSearchObject(result);
    }

    function handleAdverbChange() {
        let result = {... searchOjbect};
        result.adverb = !result.adverb;
        setSearchObject(result);
    }

    function handleUseSyllablesChange() {
        let result = {... searchOjbect};
        result.useSyllables = !result.useSyllables;
        setSearchObject(result);
    }

    function handleSyllablesChange(e) {
        let result = {... searchOjbect};
        result.syllables = e.target.value ? e.target.value : 1
        setSearchObject(result);
    }

    function handleStartsWithChange(e) {
        let result = {... searchOjbect};
        result.startsWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleEndsWithChange(e) {
        let result = {... searchOjbect};
        result.endsWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleRymesWithChange(e) {
        let result = {... searchOjbect};
        result.rymesWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleSimilarToChange(e) {
        let result = {... searchOjbect};
        result.similarTo = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    return (
        <>
            <p>Search area</p>
            <div>
                <label htmlFor="noun">Nouns</label>
                <input type="checkbox" id="noun" value={searchOjbect.noun} onChange={handleNounChange}></input>
            </div>
            <div>
                <label htmlFor="verb">Verbs</label>
                <input type="checkbox" id="verb" value={searchOjbect.verb} onChange={handleVerbChange}></input>
            </div>
            <div>
                <label htmlFor="adjective">Adjectives</label>
                <input type="checkbox" id="adjective" value={searchOjbect.adjective} onChange={handleAdjectiveChange}></input>
            </div>
            <div>
                <label htmlFor="adverb">Adverbs</label>
                <input type="checkbox" id="adverbs" value={searchOjbect.adverb} onChange={handleAdverbChange}></input>
            </div>
            <div>
                <label htmlFor="syllable">Syllables: </label>
                <input type="checkbox" id="useSyllables" value={searchOjbect.useSyllables} onChange={handleUseSyllablesChange}></input>
                {searchOjbect.useSyllables && (
                    <input type="number" id="syllables" value={searchOjbect.syllables} onChange={handleSyllablesChange}></input>
                )}
            </div>
            <div>
                <label htmlFor="startsWith">Starts with: </label>
                <input type="text" id="startsWith" value={searchOjbect.startsWith} onChange={handleStartsWithChange}></input>
            </div>
            <div>
                <label htmlFor="endsWith">Ends with: </label>
                <input type="text" id="endsWith" value={searchOjbect.endsWith} onChange={handleEndsWithChange}></input>
            </div>
            <div>
                <label htmlFor="rymesWith">Rymes with: </label>
                <input type="text" id="RymesWith" value={searchOjbect.rymesWith} onChange={handleRymesWithChange}></input>
            </div>
            <div>
                <label htmlFor="similarTo">Similar to: </label>
                <input type="text" id="similarTo" value={searchOjbect.similarTo} onChange={handleSimilarToChange}></input>
            </div>
            <button onClick={getSearchResults}>Search</button>
        </>
    )
}