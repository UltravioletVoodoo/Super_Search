import { useRef, useState, useLayoutEffect } from "react"


const defaultPosition =  {
    arrow: {
        left: 0,
        top: 0
    },
    modal: {
        left: 0,
        top: 0
    }
}

export default function PointingModal(props) {
    const modalRef = useRef(false)
    
    function getPosition() {
        if (!modalRef.current || !props.reference.current) {
            return
        }
        const refPos = props.reference.current.getBoundingClientRect()
        const modalPos = modalRef.current.getBoundingClientRect()
        const modalPadding = 10
        
        // Get the top/left for the modal
        let modalLeft = refPos.x + (refPos.width / 2) - (modalPos.width * (props.quarters/4))
        const modalTop = refPos.y - modalPos.height - 18
        if (modalLeft < modalPadding) modalLeft = modalPadding
        if (modalLeft > window.innerWidth - modalPadding - modalPos.width) modalLeft = window.innerWidth - modalPadding - modalPos.width

        // Get the top/left for the arrow
        const arrowLeft = refPos.x + (refPos.width / 2) - 13
        const arrowTop = modalTop + modalPos.height - 13

        return {
            arrow: {
                left: arrowLeft,
                top: arrowTop
            },
            modal: {
                left: modalLeft,
                top: modalTop
            }
        }
    }

    const [position, setPosition] = useState(defaultPosition)
    const closeModal = () => props.closeFunc(false)

    useLayoutEffect(() => {
        const changeListener = () => setPosition(getPosition())
        window.addEventListener('resize', changeListener)
        window.addEventListener('scroll', changeListener)
        setPosition(getPosition())

        return () => {
            window.removeEventListener('resize', changeListener)
            window.removeEventListener('scroll', changeListener)
        }
    }, [])
    
    return (
        <>
            <div ref={modalRef} className="pointingModal" style={position.modal}>
                <div className='modalHeader'>
                    <h4>{props.title}</h4>
                    <span className='closeBtn' onClick={closeModal}>x</span>
                </div>
                <p className="modalText">{props.modalText}</p>
            </div>
            <div className="modalArrow" style={position.arrow} />
            <style jsx>{`
                .pointingModal {
                    position: fixed;
                    background-color: white;
                    box-shadow: 0 0 15px darkgrey;
                    border-radius: 15px;
                    z-index: 1000;
                    width: 250px;
                }        
                .pointingModal .modalHeader {
                    border-bottom: 1px solid darkgrey;
                    margin: 0 10px 10px 10px;
                    display: flex;
                    color: darkgrey;
                }
                .pointingModal .closeBtn {
                    right: 10px;
                    position: absolute;
                    font-size: 23px;
                    color: darkgrey;
                    cursor: pointer;
                }
                .pointingModal .modalText {
                    padding: 0 10px 0 10px;
                }
                .modalArrow {
                    position: fixed;
                    height: 26px;
                    width: 26px;
                    background-color: white;
                    transform: rotate(45deg);
                    z-index: 1000;
                }
            `}</style>
        </>
    )
}