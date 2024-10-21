import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ height: '14vh' }}>
            <div className="container-fluid d-flex align-items-center"> 
                <a className="navbar-brand d-flex align-items-center" href="#" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: '8.5rem', height: '8.5rem' }} />
                    <span style={{ fontSize: '2.5rem', color: 'white' }}>Essence</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-end mb-2 mb-lg-0" style={{ width: '100%' }}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" style={{ fontSize: '1.5rem', color: 'white', lineHeight: '1.5rem',marginRight: '10px' }}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ fontSize: '1.5rem', color: 'white', lineHeight: '1.5rem' }}>About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
