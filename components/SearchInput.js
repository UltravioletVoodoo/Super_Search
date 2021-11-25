import React, { useState } from 'react';
import arrayContains from '../util/arrayContains';
import { phoneSize, tabletSize } from '../util/globalContants';
import CheckboxCombo from './checkboxCombo';
import TextFilterInput from './textFilterInput';

export default function SearchInput(props) {
    const { setter } = props;

    const [searchObject, setSearchObject] = useState({
        noun: false,
        verb: false,
        adjective: false,
        adverb: false,
        useSyllables: false,
        syllables: 2,
        startsWith: "",
        endsWith: "",
        rymesWith: "",
        similarTo: "",
        numResults: 5
    })

    function generateAPICall() {
        let result = 'https://api.datamuse.com/words?md=dsp&max=999';
        if (searchObject.startsWith.length > 0) {
            if (searchObject.endsWith.length > 0) {
                result += `&sp=${searchObject.startsWith}*${searchObject.endsWith}`
            }
            result += `&sp=${searchObject.startsWith}*`
        } else {
            if (searchObject.endsWith.length > 0) {
                result += `&sp=*${searchObject.endsWith}`
            }
        }
        if (searchObject.rymesWith.length > 0) {
            // result += `&rel_rhy=${searchObject.rymesWith}&rel_nry=${searchObject.rymesWith}`
            result += `&rel_rhy=${searchObject.rymesWith}`
        }
        if (searchObject.similarTo.length > 0) {
            result += `&ml=${searchObject.similarTo}`
        }
        return result;
    }

    function stripData(dataWords) {
        let strippedData = [];
        for (let dataWord of dataWords) {
            if (strippedData.length >= searchObject.numResults) break;
            if (!searchObject.noun && arrayContains(dataWord.tags, 'n')) continue;
            if (!searchObject.verb && arrayContains(dataWord.tags, 'v')) continue;
            if (!searchObject.adjective && arrayContains(dataWord.tags, 'adj')) continue;
            if (!searchObject.adverb && arrayContains(dataWord.tags, 'adv')) continue;
            if (searchObject.useSyllables) {
                if (searchObject.syllables != dataWord.numSyllables) continue;
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
        let result = {... searchObject};
        result.noun = !result.noun;
        setSearchObject(result);
    }

    function handleVerbChange() {
        let result = {... searchObject};
        result.verb = !result.verb;
        setSearchObject(result);
    }

    function handleAdjectiveChange() {
        let result = {... searchObject};
        result.adjective = !result.adjective;
        setSearchObject(result);
    }

    function handleAdverbChange() {
        let result = {... searchObject};
        result.adverb = !result.adverb;
        setSearchObject(result);
    }

    function handleUseSyllablesChange() {
        let result = {... searchObject};
        result.useSyllables = !result.useSyllables;
        setSearchObject(result);
    }

    function handleSyllablesChange(e) {
        let result = {... searchObject};
        result.syllables = e.target.value ? e.target.value : 1
        setSearchObject(result);
    }

    function handleStartsWithChange(e) {
        let result = {... searchObject};
        result.startsWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleEndsWithChange(e) {
        let result = {... searchObject};
        result.endsWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleRymesWithChange(e) {
        let result = {... searchObject};
        result.rymesWith = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleSimilarToChange(e) {
        let result = {... searchObject};
        result.similarTo = e.target.value ? e.target.value : "";
        setSearchObject(result);
    }

    function handleNumResultsChange(e) {
        let result = {... searchObject};
        result.numResults = e.target.value ? e.target.value : 1
        setSearchObject(result);
    }

    return (
        <>
            <div className="inputContainer">
                <div className="inputSetContainer textInputContainer">
                    {/* <div className="InputAligner">
                        <div className="textInputContainer">
                            <label className="inputText" htmlFor="startsWith">Starts with:</label>
                            <input className="inputText inputTextBar" type="text" id="startsWith" value={searchObject.startsWith} onChange={handleStartsWithChange}></input>
                        </div>
                        <div className="textInputContainer">
                            <label className="inputText" htmlFor="endsWith">Ends with:</label>
                            <input className="inputText inputTextBar" type="text" id="endsWith" value={searchObject.endsWith} onChange={handleEndsWithChange}></input>
                        </div>
                        <div className="textInputContainer">
                            <label className="inputText" htmlFor="rymesWith">Rymes with:</label>
                            <input className="inputText inputTextBar" type="text" id="RymesWith" value={searchObject.rymesWith} onChange={handleRymesWithChange}></input>
                        </div>
                        <div className="textInputContainer">
                            <label className="inputText" htmlFor="similarTo">Similar to:</label>
                            <input className="inputText inputTextBar" type="text" id="similarTo" value={searchObject.similarTo} onChange={handleSimilarToChange}></input>
                        </div>
                        <div className="textInputContainer">
                            <label className="inputText" htmlFor="numResults">Records:</label>
                            <input className="inputText inputTextBar" type="number" id="numResults" value={searchObject.numResults} onChange={handleNumResultsChange}></input>
                        </div>
                    </div> */}

                    <TextFilterInput />
                    <TextFilterInput />
                    <TextFilterInput />
                    <TextFilterInput />
                    <TextFilterInput />
                    <TextFilterInput />

                </div>
                <div className="inputSetContainer checkboxesContainer">
                    <div className="checkboxesInclude">INCLUDE:</div>
                    <div className="checkboxSection">
                        <CheckboxCombo inputId="noun" inputValue={searchObject.noun} inputOnChange={handleNounChange} labelText="Nouns" />
                        <CheckboxCombo inputId="verb" inputValue={searchObject.verb} inputOnChange={handleVerbChange} labelText="Verbs" />
                    </div>
                    <div className="checkboxSection">
                        <CheckboxCombo inputId="adjective" inputValue={searchObject.adjective} inputOnChange={handleAdjectiveChange} labelText="Adjectives" />
                        <CheckboxCombo inputId="adverb" inputValue={searchObject.adverb} inputOnChange={handleAdverbChange} labelText="Adverbs" />
                    </div>
                    <div className="includeAllSection">
                        <CheckboxCombo inputId="includeAll" inputValue={false} labelText="Include All" />
                    </div>
                </div>
                <div className="searchContainer">
                    <button className="searchButton" onClick={getSearchResults}>Search</button>
                </div>
            </div>
            <style jsx>{`
                .inputContainer {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: #91b4eb;
                }
                .inputSetContainer {
                    display: inline-block;
                    position: relative;
                    width: 49%;
                    margin: 20px 0 20px 0;
                    text-align: center;
                }
                .checkboxesContainer {
                    text-align: center;
                }
                .checkboxesInclude {
                    font-size: 32px;
                    font-family: helvetica;
                    text-decoration: underline;
                    margin-bottom: 10px;
                }
                .checkboxSection {
                    width: max-content;;
                    display: inline-block;
                    text-align: left;
                }
                .includeAllSection {
                    width: 100%;
                    display: block;
                    left-align: center;
                }
                .InputAligner {
                    height: 100%;
                    position: relative;
                    width: max-content;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: right;
                }
                .textsContainer {
                    right: 0;
                }
                .textInputContainer {
                    margin-bottom: 10px;
                }
                .checkboxContainer {
                    width: 100%;
                    margin-bottom: 10px;
                }
                .searchContainer {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    text-align: center;
                }
                .searchButton {
                    width: 200px;
                    height: 100px;
                    font-weight: bold;
                    background-color: blue;
                    color: white;
                    transition: 0.3s;
                }
                .searchButton:hover {
                    background-color: lightblue;
                }
                .inputTextBar {
                    height: 20px;
                }
            `}</style>
        </>
    )
}