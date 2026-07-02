import { useRef } from "react"
import "./SpotlightCard.css"

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.25)",
}) {
    const divRef = useRef(null)

    const updateSpotlightPosition = (event) => {
        if (!divRef.current) return

        const rect = divRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        divRef.current.style.setProperty("--mouse-x", `${x}px`)
        divRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    return (
        <div
            ref={divRef}
            onPointerEnter={updateSpotlightPosition}
            onPointerMove={updateSpotlightPosition}
            className={`card-spotlight ${className}`}
            style={{ "--spotlight-color": spotlightColor }}
        >
            {children}
        </div>
    )
}
