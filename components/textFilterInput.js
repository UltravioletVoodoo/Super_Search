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
                    margin: 0 0 5px 0;
                }
                .checkbox {
                    margin-right: 10px;
                    height: 20px;
                    width: 20px;
                    position: relative;
                    top: 4px;
                }
                .label {
                    margin-right: 10px;
                }
                .input {
                    width: 100px;
                }
                .text {
                    font-size: 16px;
                    font-family: helvetica;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}