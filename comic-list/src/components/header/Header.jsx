import WebsiteLogo from '../../asset/Icon/Logo.png'
import './Header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {

    const [scrolledNav, setScrolledNav] = useState(false);
    const [showNav, setShowNav] = useState(false);

    const updateNavBackground = () => {
        if(window.scrollY > 0) setScrolledNav(true)
        else setScrolledNav(false)
    }

    const toggleNav = () => {
        setShowNav(prevNav => !prevNav);
    }

    window.addEventListener('scroll', updateNavBackground);
    
    return(
        <header className={scrolledNav ? 'scrolled-nav' : ''}>
            <Link to={'/'} className="logo">
                <img src={ WebsiteLogo } alt="" />
                <h3>MyList</h3>
            </Link>
            <FontAwesomeIcon icon="fa-solid fa-bars" className="hamnav-logo" onClick={toggleNav}/>
            <nav className={showNav ? 'show-nav' : ''}>
                <Link to={`/`} className="nav-item">Home</Link>
                <Link to={`/Comics`} className="nav-item">Comics</Link>
                <Link to={`/MyList`} className="nav-item">MyList</Link>
            </nav>
        </header>
        
    )
}