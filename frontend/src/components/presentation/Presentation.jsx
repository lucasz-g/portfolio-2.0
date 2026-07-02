import presentationBackground from "../../assets/presentation-background.mp4"
import { ScrollArrow } from "../scrollArrow/ScrollArrow"
import "./presentation.css"
import SoftAurora from '../../react-bits/SoftAurora';

export const Presentation = () => {
    return (
        <section id="home" className="presentation-section">
            {/* <video className="presentation-video" autoPlay muted loop playsInline>
                <source src={presentationBackground} type="video/mp4" />
            </video> */}

            <div className="presentation-background">
                <SoftAurora
                    speed={0.6}
                    scale={1.5}
                    brightness={1}
                    color1="#f7f7f7"
                    color2="#e100ff"
                noiseFrequency={2.5}
                noiseAmplitude={1}
                bandHeight={0.5}
                bandSpread={1}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={1}
                enableMouseInteraction
                mouseInfluence={1}
            />
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
