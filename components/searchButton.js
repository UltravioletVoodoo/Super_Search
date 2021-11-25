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
                    position: relative;
                }
                .button {
                    width: 200px;
                    height: 75px;
                    background-color: #e8c46f;
                    transition: 0.3s;
                    font-size: 30px;
                    font-family: helvetica;
                    font-weight: bold;
                }
                .button:hover {
                    background-color: #ffd573;
                }
            `}</style>
        </>
    );
}