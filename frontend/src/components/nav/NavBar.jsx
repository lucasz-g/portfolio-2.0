import "./NavBar.css"

export const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* <a className="navbar-brand">LUCAS GARCIA</a> */}

                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="#home" className="navbar-link">Home</a></li>
                    <li className="navbar-item"><a href="#about" className="navbar-link">Projects</a></li>
                    <li className="navbar-item"><a href="#projects" className="navbar-link">Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}
