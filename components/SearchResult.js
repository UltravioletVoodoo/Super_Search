import { useRef, useState } from "react";
import { wordTypes } from "../util/wordTypes";
import PointingModal from "./pointingModal";

const defaultPosition = {
    arrow: {
        left: 0,
        top: 0
    },
    modal: {
        left: 0,
        top: 0
    }
}

export default function SearchResult(props) {
    const { word } = props
    const wordRef = useRef(false);
    const [modalOpen, setModalOpen] = useState(false);

    console.log(word)

    function capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    function parseTypes(typesArray) {
        let result = '';
        if (typesArray != null) {
            for (let type of typesArray) {
                if (result.length > 0) {
                    result += `, ${capitalize(wordTypes[type])}`;
                } else {
                    result = capitalize(wordTypes[type]);
                }
            }
        } else {
            result = 'Unknown'
        }
        return result;
    }

    function parseDef(definitionArray) {
        console.log(definitionArray)
        let result = '';
        if (definitionArray != null) {
            for (let definition of definitionArray) {
                definition = definition.replace("n\t", "");
                if (result.length > 0) {
                    result += `; ${capitalize(definition)}`;
                } else {
                    result = capitalize(definition);
                }
            }
        } else {
            result = 'No definition in database';
        }
        return result;
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function getBackgroundColor() {
        return "chartreuse";
    }

    function getBackgroundHoverColor() {
        return "green";
    }

    return (
        <>
            <div ref={wordRef} className="word" onClick={toggleModal}>{capitalize(word.word)}</div>
            {modalOpen && (
                <PointingModal 
                    modalText={parseDef(word.defs)}
                    reference={wordRef}
                    closeFunc={setModalOpen}
                    title={capitalize(word.word)}
                    quarters={2}
                />
            )}
            <style jsx>{`
                .word {
                    display: inline-block;
                    border: 1px solid black;
                    border-radius: 10px;
                    width: fit-content;
                    padding: 5px;
                    margin: 5px;
                    background-color: ${getBackgroundColor()};
                    cursor: pointer;
                    transition: 0.2s;
                }
                .word:hover {
                    background-color: ${getBackgroundHoverColor()};
                }
            `}</style>
        </>
    )
}