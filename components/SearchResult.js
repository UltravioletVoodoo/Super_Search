import { wordTypes } from "../util/wordTypes";

export default function SearchResult(props) {
    const { word } = props

    console.log(word)

    function capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    function parseTypes(typesArray) {
        let result = '';
        for (let type of typesArray) {
            if (result.length > 0) {
                result += `, ${capitalize(wordTypes[type])}`;
            } else {
                result = capitalize(wordTypes[type]);
            }
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

    return (
        <>
            <div className='wordWrapper'>
                <h1 className='word'>{capitalize(word.word)}</h1>
                <hr className='lineRule'></hr>
                <p className='wordTypes'>{parseTypes(word.tags)}</p>
                <p className='definition'>{parseDef(word.defs)}</p>
            </div>
            <style jsx>{`
                .wordWrapper {
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    margin: 20px 0 20px 0;
                    padding: 5px;
                    box-shadow: 0px 0px 25px 10px #838383;
                    border-radius: 5px;
                }
                .word {
                    padding-bottom: 5px;
                }
                .lineRule {
                    position: relative;
                    width: 90%;
                    left: 50%;
                    transform: translateX(-56%);
                }
                .wordTypes {
                    font-size: 18px;
                    color: gray;
                }
            `}</style>
        </>
    )
}