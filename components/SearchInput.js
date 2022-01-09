import React, { useState } from 'react';
import arrayContains from '../util/arrayContains';
import CheckboxCombo from './checkboxCombo';
import SearchButton from './searchButton';
import TextFilterInput from './textFilterInput';

export default function SearchInput(props) {
    const { setter } = props;

    const [searchObject, setSearchObject] = useState({
        noun: false,
        verb: false,
        adjective: false,
        adverb: false,
        useAll: false,
        useSyllables: false,
        syllables: 2,
        useStartsWith: false,
        startsWith: "",
        useEndsWith: false,
        endsWith: "",
        useRymesWith: false,
        rymesWith: "",
        useSimilarTo: false,
        similarTo: "",
    })

    function generateAPICall() {
        let result = 'https://api.datamuse.com/words?md=dsp&max=999';
        if (searchObject.useStartsWith && searchObject.startsWith.length > 0) {
            if (searchObject.useEndsWith && searchObject.endsWith.length > 0) {
                result += `&sp=${searchObject.startsWith}*${searchObject.endsWith}`
            }
            result += `&sp=${searchObject.startsWith}*`
        } else {
            if (searchObject.useEndsWith && searchObject.endsWith.length > 0) {
                result += `&sp=*${searchObject.endsWith}`
            }
        }
        if (searchObject.useRymesWith && searchObject.rymesWith.length > 0) {
            // result += `&rel_rhy=${searchObject.rymesWith}&rel_nry=${searchObject.rymesWith}`
            result += `&rel_rhy=${searchObject.rymesWith}`
        }
        if (searchObject.useSimilarTo && searchObject.similarTo.length > 0) {
            result += `&ml=${searchObject.similarTo}`
        }
        return result;
    }

    function stripData(dataWords) {
        let strippedData = [];
        for (let dataWord of dataWords) {
            if (!searchObject.noun && arrayContains(dataWord.tags, 'n')) continue;
            if (!searchObject.verb && arrayContains(dataWord.tags, 'v')) continue;
            if (!searchObject.adjective && arrayContains(dataWord.tags, 'adj')) continue;
            if (!searchObject.adverb && arrayContains(dataWord.tags, 'adv')) continue;
            if (searchObject.useSyllables && searchObject.syllables != dataWord.numSyllables) continue;
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
                setter(stripData(JSON.parse(request.response)).sort((a, b) => a.numSyllables - b.numSyllables));
            } else {
                console.log("No data");
            }

        }
        request.send()
    }

    function handleWordTypeCheckboxChange(newValue, checkboxKey) {
        if (checkboxKey === "useAll") {
            handleUseAll(newValue);
            return;
        }

        if (!searchObject.useAll) { // if we are not using all, then it is safe to allow the others to change
            let result = {... searchObject};
            result[checkboxKey] = newValue;
            setSearchObject(result);
        }
    }

    function handleUseAll(newValue) {
        let result = {... searchObject};
        result.useAll = newValue;
        if (result.useAll) { // if we set useAll to true, then set all of the others to true aswell
            result.noun = true;
            result.verb = true;
            result.adjective = true;
            result.adverb = true;
        }
        setSearchObject(result);
    }

    function handleCheckboxChange(key) {
        let result = { ... searchObject};
        result[key] = !result[key];
        setSearchObject(result);
    }

    function handleSyllablesChange(e) {
        let result = {... searchObject};
        result.syllables = e.target.value ? e.target.value : 1
        setSearchObject(result);
    }

    function handleStartsWithChange(newValue) {
        let result = {... searchObject};
        result.startsWith = newValue;
        setSearchObject(result);
    }

    function handleEndsWithChange(newValue) {
        let result = {... searchObject};
        result.endsWith = newValue;
        setSearchObject(result);
    }

    function handleRymesWithChange(newValue) {
        let result = {... searchObject};
        result.rymesWith = newValue;
        setSearchObject(result);
    }

    function handleSimilarToChange(newValue) {
        let result = {... searchObject};
        result.similarTo = newValue;
        setSearchObject(result);
    }


    return (
        <>
            <div className="mainArea">
                <div className="inputContainer">
                    <div className="inputSetContainer">
                        <div className="textFilterInputContainer">
                            <TextFilterInput labelText="Starts with" inputType="text" inputOnChange={handleStartsWithChange} inputValue={searchObject.startsWith} checkboxFunc={handleCheckboxChange} checkboxKey="useStartsWith" checkboxValue={searchObject.useStartsWith} />
                            <TextFilterInput labelText="Ends with" inputType="text" inputOnChange={handleEndsWithChange} inputValue={searchObject.endsWith} checkboxFunc={handleCheckboxChange} checkboxKey="useEndsWith" checkboxValue={searchObject.useEndsWith} />
                            <TextFilterInput labelText="Rymes with" inputType="text" inputOnChange={handleRymesWithChange} inputValue={searchObject.rymesWith} checkboxFunc={handleCheckboxChange} checkboxKey="useRymesWith" checkboxValue={searchObject.useRymesWith} />
                            <TextFilterInput labelText="Similar to" inputType="text" inputOnChange={handleSimilarToChange} inputValue={searchObject.similarTo} checkboxFunc={handleCheckboxChange} checkboxKey="useSimilarTo" checkboxValue={searchObject.useSimilarTo} />
                            {/* <TextFilterInput labelText="# of letters" inputOnChange={handleNumLettersChange} inputValue={searchObject.numLetters} /> */}
                            <TextFilterInput labelText="# of syllables" inputType="number" inputOnChange={handleSyllablesChange} inputValue={searchObject.syllables} checkboxFunc={handleCheckboxChange} checkboxKey="useSyllables" checkboxValue={searchObject.useSyllables} />
                        </div>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="inputSetContainer">
                        <div className="checkboxesInclude">INCLUDE:</div>
                        <div className="checkboxSection">
                            <CheckboxCombo inputValue={searchObject.noun} inputOnChange={handleWordTypeCheckboxChange} checkboxKey="noun" labelText="Nouns" />
                            <CheckboxCombo inputValue={searchObject.verb} inputOnChange={handleWordTypeCheckboxChange} checkboxKey="verb" labelText="Verbs" />
                        </div>
                        <div className="checkboxSection">
                            <CheckboxCombo inputValue={searchObject.adjective} inputOnChange={handleWordTypeCheckboxChange} checkboxKey="adjective" labelText="Adjectives" />
                            <CheckboxCombo inputValue={searchObject.adverb} inputOnChange={handleWordTypeCheckboxChange} checkboxKey="adverb" labelText="Adverbs" />
                        </div>
                        <div className="includeAllSection">
                            <CheckboxCombo inputValue={searchObject.useAll} inputOnChange={handleWordTypeCheckboxChange} checkboxKey="useAll" labelText="Include All" />
                        </div>
                    </div>
                </div>
                <SearchButton buttonOnClick={getSearchResults} />
            </div>
            <style jsx>{`
                .mainArea {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: #e8a372;
                    border: 2px solid black;
                    border-radius: 10px;
                }
                .inputContainer {
                    display: block;
                    position: relative;
                    width: 90%;
                    height: 65%;
                    left: 50%;
                    top: 50px;
                    transform: translateX(-50%);
                    background-color: #1f8c8a;
                    border: 7px solid #094a49;
                    border-radius: 5px;
                }
                .inputSetContainer {
                    display: inline-block;
                    position: relative;
                    width: 49%;
                    margin: 20px 0 20px 0;
                    vertical-align: top;
                    text-align: center;
                }
                .verticalLine {
                    position: absolute;
                    width: 0;
                    height: 90%;
                    left: calc(50% + 2px);
                    top: 50%;
                    transform: translate(-50%, -50%);
                    border-left: 2px solid black;
                }
                .checkboxesInclude {
                    font-size: 32px;
                    font-family: cursive;
                    margin-bottom: 10px;
                }
                .checkboxSection {
                    width: max-content;;
                    display: inline-block;
                    text-align: left;
                    margin: 15px;
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
                .textFilterInputContainer {
                    width: max-content;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .checkboxContainer {
                    width: 100%;
                    margin-bottom: 10px;
                }
                .inputTextBar {
                    height: 20px;
                }
            `}</style>
        </>
    )
}