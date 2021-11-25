export default function TextFilterInput(props) {
    const { labelText } = props;

    return (
        <>
            <div className="textFilterInput">
                <input className="checkbox" type="checkbox"></input>
                <label className="label text">{labelText}</label>
                <input className="input text" type="text"></input>
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