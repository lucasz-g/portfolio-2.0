import "./navbar.css"

export const NavBar = () => {
    return (
        <>
        <nav class="navbar">
            <div class="navbar-container">      
                <ul class="navbar-menu">
                  <li class="navbar-item"><a href="#home" class="navbar-link">Home</a></li>
                  <li class="navbar-item"><a href="#services" class="navbar-link">Services</a></li>
                  <li class="navbar-item"><a href="#about" class="navbar-link">About</a></li>
                  <li class="navbar-item"><a href="#contact" class="navbar-link">Contact</a></li>
                </ul>
            </div>
        </nav>
        </>
        
    )
}