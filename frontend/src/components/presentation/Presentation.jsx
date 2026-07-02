import { lazy, Suspense } from "react"
import { ScrollArrow } from "../scrollArrow/ScrollArrow"
import "./presentation.css"

const beamsModule = import("../../react-bits/Beams")
const Beams = lazy(() => beamsModule)

export const Presentation = () => {
    return (
        <section id="home" className="presentation-section">
            <div className="presentation-background" aria-hidden="true">
                <Suspense fallback={<div className="presentation-background-fallback" />}>
                    <Beams
                        beamWidth={2}
                        beamHeight={15}
                        beamNumber={10}
                        lightColor="#f7f7f7"
                        speed={4}
                        noiseIntensity={1.15}
                        scale={0.16}
                        rotation={30}
                    />
                </Suspense>
            </div>

            <div className="role-name-div">
                <p className="role">software engineer</p>
                <h1>Lucas Garcia</h1>
                <p className="role-description">Backend development, AI integration and modern web applications.</p>
            </div>

            <ScrollArrow targetId="about" label="Ir para a secao About" />
        </section>
    )
}
