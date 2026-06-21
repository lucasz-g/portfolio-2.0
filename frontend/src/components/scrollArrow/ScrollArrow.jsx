import arrowDown from "../../assets/arrow-down.png"
import "./ScrollArrow.css"

export const ScrollArrow = ({ targetId, label = "Ir para a proxima secao" }) => {
    return (
        <a className="scroll-arrow" href={`#${targetId}`} aria-label={label}>
            <img className="scroll-arrow-img" src={arrowDown} alt="" aria-hidden="true" />
        </a>
    )
}
