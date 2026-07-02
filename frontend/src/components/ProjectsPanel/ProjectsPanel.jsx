import projectsVideo from "../../assets/projects-video.mp4"
import { useEffect, useRef } from "react"
import { Kicker } from "../kicker/Kicker"
import "./ProjectsPanel.css"

export const ProjectsPanel = () => {
    const videoRef = useRef(null)

    // UseEffect para garantir que o vídeo seja reproduzido automaticamente, mesmo em navegadores que bloqueiam a reprodução automática de vídeos com som. O vídeo é configurado para ser reproduzido em loop, sem som e com atributos específicos para compatibilidade com diferentes navegadores e dispositivos.
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const playVideo = () => {
            video.defaultMuted = true
            video.muted = true
            video.playsInline = true
            video.setAttribute("muted", "")
            video.setAttribute("playsinline", "")
            video.setAttribute("webkit-playsinline", "")

            const playPromise = video.play()
            if (playPromise?.catch) {
                playPromise.catch(() => {
                    video.classList.add("projects-video-paused")
                })
            }
        }

        const handlePlaying = () => {
            video.classList.remove("projects-video-paused")
        }

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                playVideo()
            }
        }

        playVideo()
        video.addEventListener("loadedmetadata", playVideo)
        video.addEventListener("canplay", playVideo)
        video.addEventListener("playing", handlePlaying)
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            video.removeEventListener("loadedmetadata", playVideo)
            video.removeEventListener("canplay", playVideo)
            video.removeEventListener("playing", handlePlaying)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    return (
        <section className="projects-hero">
            <div className="projects-video-frame">
                <video
                    ref={videoRef}
                    className="projects-video"
                    autoPlay
                    muted
                    defaultMuted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                    aria-label="Rotating 3D object preview"
                >
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
