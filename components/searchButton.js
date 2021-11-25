export default function SearchButton(props) {

    const { buttonOnClick } = props

    return (
        <>
            <div className="buttonContainer">
                <button className="button" onClick={buttonOnClick}>Find Words!</button>
            </div>
            <style jsx>{`
                .buttonContainer {
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                    margin-bottom: 10px;
                }
                .button {
                    width: 200px;
                    height: 75px;
                    background-color: #e8c46f;
                    transition: 0.3s;
                    font-size: 30px;
                    font-family: cursive;
                    font-weight: bold;
                    border: 2px solid black;
                    box-shadow: 0px 0px 0px 5px #faeaa5;
                    border-radius: 1px;
                }
                .button:hover {
                    background-color: #ffd573;
                }
            `}</style>
        </>
    );
}