export default function TextFilterInput() {
    return (
        <>
            <div>
                <input className="checkbox" type="checkbox"></input>
                <label className="label">Placeholder Label</label>
                <input className="input" type="text"></input>
            </div>
            <style jsx>{`
                .checkbox {
                    margin-right: 10px;
                }
                .label {
                    margin-right: 10px;
                }
                .input {
                    width: 100px;
                }
            `}</style>
        </>
    );
}