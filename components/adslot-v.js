export default function AdslotVertical(props) {
    const { type } = props;

    return (
        <>
            <div className="superSearchAdslot"></div>
            <style jsx>{`
                .superSearchAdslot {
                    position: absolute;
                    display: inline-block;
                    width: 100px;
                    height: 100%;
                    background-color: green;
                    left: 50%;
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    )
}