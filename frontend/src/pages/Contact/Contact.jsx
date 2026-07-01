import contactImage from "../../assets/contact.png"
import { Kicker } from "../../components/kicker/Kicker"
import "./Contact.css"

const contactLinks = [
    {
        label: "Email",
        value: "lucasg.02@icloud.com",
        href: "mailto:lucasg.02@icloud.com",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/lucas-garcia-dsv",
        href: "https://www.linkedin.com/in/lucas-garcia-dsv/",
    },
    {
        label: "GitHub",
        value: "github.com/lucasz-g",
        href: "https://github.com/lucasz-g",
    },
]

export const Contact = () => {
    return (
        <main className="contact-page">
            <section className="contact-panel">
                <div className="contact-copy">
                    <Kicker titulo="Contact"/>
                    <h1>Let's build something useful.</h1>
                    <p>
                        Have a project, an idea, or a backend/API integration that needs to become real? Send me a message and I will get back to you.
                    </p>

                    <div className="contact-links" aria-label="Contact links">
                        {contactLinks.map((link) => (
                            <a key={link.label} className="contact-link" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                                <span>{link.label}</span>
                                <strong>{link.value}</strong>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="contact-image-wrap">
                    <img src={contactImage} alt="Contact visual" />
                </div>
            </section>
        </main>
    )
}
