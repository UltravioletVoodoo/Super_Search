import { useState } from "react";

export default function TextFilterInput(props) {
    const { labelText, inputOnChange, inputValue, inputType } = props;

    const [ checkboxTicked, setCheckBoxTicked ] = useState(false);


    function toggle() {
        setCheckBoxTicked(!checkboxTicked);
    }

    function changeHandler(e) {
        let newValue = inputType === "number" ? 1 : "";
        if (checkboxTicked) {
            if (inputType === "text") {
                newValue = e.target.value ? e.target.value : "";
            } else if (inputType === "number") {
                newValue = e.target.value ? e.target.value : 1;
            }
        }
        inputOnChange(newValue);
    }

    return (
        <>
            <div className="textFilterInput">
                <input className="checkbox" type="checkbox" onChange={toggle} value={checkboxTicked}></input>
                <label className="label text">{labelText}</label>
                <input className="input text" type="text" onChange={changeHandler} value={inputValue} type={inputType}></input>
            </div>
            <style jsx>{`
                .textFilterInput {
                    text-align: left;
                    margin: 0 0 10px 0;
                }
                .checkbox {
                    margin-right: 10px;
                    height: 20px;
                    width: 20px;
                    position: relative;
                    top: 4px;
                    outline: 2px solid black;
                }
                .checkbox:focus {
                    outline: 2px solid black;
                }
                .label {
                    margin-right: 10px;
                }
                .input {
                    width: 100px;
                    outline: 2px solid black;
                }
                .input:focus {
                    outline: 2px solid black;
                }
                .text {
                    font-size: 20px;
                    font-family: cursive;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}