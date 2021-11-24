export default function AdslotHorizontal(props) {
    const { type } = props;

    return (
        <>
            <div className="superSearchAdslot"></div>
            <style jsx>{`
                .superSearchAdslot {
                    position: absolute;
                    display: inline-block;
                    width: 320px;
                    height: 100px;
                    background-color: green;
                    left: 50%;
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    )
}