import WebsiteLogo from "../../asset/Icon/Logo.png";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { pathname } = useLocation();
  const [scrolledNav, setScrolledNav] = useState(() => pathname !== "/");

  const [showNav, setShowNav] = useState(false);

  const updateNavBackground = () => {
    if (pathname === "/") {
      if (window.scrollY > 0) setScrolledNav(true);
      else setScrolledNav(false);
    }
  };

  useEffect(() => {
    setScrolledNav(pathname !== "/");
  }, [pathname]);

  const toggleNav = () => {
    setShowNav((prevNav) => !prevNav);
  };

  window.addEventListener("scroll", updateNavBackground);

  return (
    <header className={scrolledNav || pathname !== "/" ? "scrolled-nav" : ""}>
      <Link to={"/"} className="logo">
        <img src={WebsiteLogo} alt="" />
        <h3>MyList</h3>
      </Link>
      <FontAwesomeIcon
        icon="fa-solid fa-bars"
        className="hamnav-logo"
        onClick={toggleNav}
      />
      <nav className={showNav ? "show-nav" : ""}>
        <Link to={`/`} className="nav-item" onClick={toggleNav}>
          Home
        </Link>
        <Link to={`/comic`} className="nav-item" onClick={toggleNav}>
          Comics
        </Link>
        <Link to={`/list`} className="nav-item" onClick={toggleNav}>
          MyList
        </Link>
      </nav>
    </header>
  );
}
