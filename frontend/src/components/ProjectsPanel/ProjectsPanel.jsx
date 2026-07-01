import projectsVideo from "../../assets/projects-video.mp4"
import { Kicker } from "../kicker/Kicker"
import "./ProjectsPanel.css"

export const ProjectsPanel = () => {
    return (
        <section className="projects-hero">
            <div className="projects-video-frame">
                <video className="projects-video" autoPlay muted loop playsInline preload="auto" {...{ "webkit-playsinline": "true" }}>
                    <source src={projectsVideo} type="video/mp4" />
                </video>
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
