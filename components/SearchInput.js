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
        useSyllables: false,
        syllables: 2,
        startsWith: "",
        endsWith: "",
        rymesWith: "",
        similarTo: "",
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
            if (!searchObject.noun && arrayContains(dataWord.tags, 'n')) continue;
            if (!searchObject.verb && arrayContains(dataWord.tags, 'v')) continue;
            if (!searchObject.adjective && arrayContains(dataWord.tags, 'adj')) continue;
            if (!searchObject.adverb && arrayContains(dataWord.tags, 'adv')) continue;
            if (searchObject.syllables != dataWord.numSyllables) continue;
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

    return (
        <>
            <div className="mainArea">
                <div className="inputContainer">
                    <div className="inputSetContainer">
                        <div className="textFilterInputContainer">
                            <TextFilterInput labelText="Starts with" inputType="text" inputOnChange={handleStartsWithChange} inputValue={searchObject.startsWith} />
                            <TextFilterInput labelText="Ends with" inputType="text" inputOnChange={handleEndsWithChange} inputValue={searchObject.endsWith} />
                            <TextFilterInput labelText="Rymes with" inputType="text" inputOnChange={handleRymesWithChange} inputValue={searchObject.rymesWith} />
                            <TextFilterInput labelText="Similar to" inputType="text" inputOnChange={handleSimilarToChange} inputValue={searchObject.similarTo} />
                            {/* <TextFilterInput labelText="# of letters" inputOnChange={handleNumLettersChange} inputValue={searchObject.numLetters} /> */}
                            <TextFilterInput labelText="# of syllables" inputType="number" inputOnChange={handleSyllablesChange} inputValue={searchObject.syllables} />
                        </div>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="inputSetContainer">
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