import MyCheckbox from "./myCheckbox";

export default function CheckboxCombo(props) {
    const { inputValue, inputOnChange, labelText, checkboxKey } = props;

    function handleClick(newValue) {
        inputOnChange(newValue, checkboxKey);
    }

    return (
        <>
            <div className="checkboxCombo">
                <MyCheckbox value={inputValue} setter={handleClick} />
                <label className="inputText">{labelText}</label>
            </div>
            <style jsx>{`
                .checkboxCombo {
                    margin: 0 5px 20px 5px;
                }
                .inputText {
                    font-size: 20px;
                    font-family: cursive;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}