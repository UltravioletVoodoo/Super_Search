export default function MyCheckbox(props) {
    const { value, setter } = props;

    function handleOnClick() {
        setter(!value);
    }

    return (
        <>
            <div className="checkbox" onClick={handleOnClick}></div>
            <style jsx>{`
                .checkbox {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    outline: 2px solid black;
                    background-color: ${value ? "green" : "white"};
                }
            `}</style>
        </>
    );
}