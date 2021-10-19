export default function Adslot(props) {
    const { type } = props;

    return (
        <>
            <div className="superSearchAdslot"></div>
            <style jsx>{`
                .superSearchAdslot {
                    position: absolute;
                    display: inline-block;
                    width: ${type == "vertical" ? 100 : 320}px;
                    height: ${type == "vertical" ? 400 : 100}px;
                    background-color: green;
                    left: 50%;
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    )
}