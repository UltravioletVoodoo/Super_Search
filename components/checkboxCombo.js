export default function CheckboxCombo(props) {
    const { inputValue, inputId, inputOnChange, labelText } = props;

    return (
        <>
            <div className="checkboxCombo">
                <input className="checkbox" type="checkbox" id={inputId} value={inputValue} onChange={inputOnChange}></input>
                <label className="inputText">{labelText}</label>
            </div>
            <style jsx>{`
                .checkboxCombo {
                    margin: 0 5px 5px 5px;
                }
                .checkbox {
                    height: 20px;
                    width: 20px;
                    position: relative;
                    top: 4px;
                    margin-right: 5px;
                }
                .inputText {
                    font-size: 16px;
                    font-family: helvetica;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}