import { lazy, Suspense } from "react"
import { Kicker } from "../kicker/Kicker"
import "./ProjectsPanel.css"

const Orb = lazy(() => import("../../react-bits/Orb"))

export const ProjectsPanel = () => {
    return (
        <section className="projects-hero">
            <div className="projects-orb-frame" aria-hidden="true">
                <Suspense fallback={<div className="projects-orb-fallback" />}>
                    <Orb
                        hue={13}
                        hoverIntensity={0.2}
                        rotateOnHover
                        backgroundColor="#050505"
                    />
                </Suspense>
            </div>

            <div className="projects-copy">
                <Kicker titulo="Selected Work" />
                <h1>Projects</h1>
                <p>
                    A collection of software solutions, applications and experiments built throughout my software engineering journey.
                </p>
            </div>
        </section>
    )
}
