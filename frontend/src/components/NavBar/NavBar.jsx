import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import "./NavBar.css"

export const NavBar = () => {
    // Controla se a navbar deve mostrar o visual de pagina rolada.
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        // Ativa o brilho depois que o usuario rola um pouco a pagina.
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12)
        }

        // Executa uma vez ao montar, caso a pagina ja carregue fora do topo.
        handleScroll()
        window.addEventListener("scroll", handleScroll)

        // Remove o listener ao desmontar o componente para evitar listeners duplicados.
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        // A classe extra ativa o brilho e o blur definidos no CSS.
        <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
            <div className="navbar-container">
                <ul className="navbar-menu">
                    <li className="navbar-item"><NavLink to="/" end className="navbar-link">Home</NavLink></li>
                    <li className="navbar-item"><NavLink to="/projects" className="navbar-link">Projects</NavLink></li>
                    <li className="navbar-item"><NavLink to="/contact" className="navbar-link">Contact</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
