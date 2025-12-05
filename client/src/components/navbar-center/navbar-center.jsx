import { Link } from 'react-router-dom';
import styles from './navbar-center.module.css';
import { useState } from 'react';
import logoCalendario from "../../assets/navbar-center/logo-calendario.png";

function NavCenter() {
  const [menuDisplay, setMenuDisplay] = useState(false);

  return (
    <div className={styles['source-contenedor-barra-nav']}>
      <div className={styles['source-contenedor-barra-nav-interno']}>
        
        {/* Left: Logo */}
        <div className={styles['navbar-left']}>
          <Link to="/" className={styles['source-contenedor-nav-bar-izquierdo']}>
            <img src={logoCalendario} alt="logoCalendario" className={styles['img-logo-calendario']} />
            <p className={styles['source-contenedor-nav-bar-izquierdo-texto']}>CitaYa</p>
          </Link>
        </div>

        {/* Center: Links (desktop only) */}
        <div className={styles['source-contenedor-nav-bar-centro']}>
          <Link to="/services" className={styles['source-contenedor-nav-bar-centro-texto']}>
            Servicios
          </Link>
          <Link to="/about-us" className={styles['source-contenedor-nav-bar-centro-texto']}>
            ¿Quiénes somos?
          </Link>
          <Link to="/contact" className={styles['source-contenedor-nav-bar-centro-texto']}>
            Contáctanos
          </Link>
        </div>

        {/* Right: Buttons + Hamburger */}
        <div className={styles['navbar-right']}>
          <Link to="/login" className={styles['source-boton-login']}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Iniciar sesión
          </Link>
          <Link to="/register" className={styles['source-boton-register']}>
            <i className="fa-solid fa-user-plus"></i> Registrate
          </Link>

          {/* Hamburger menu for mobile */}
          <div
            className={styles['source-boton-menu-desplegable']}
            onClick={() => setMenuDisplay(!menuDisplay)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>

      </div>

      {/* Mobile dropdown menu */}
      {menuDisplay && (
        <div className={styles['source-menu-movil']}>
          <Link to="/services">Servicios</Link>
          <Link to="/about-us">¿Quiénes somos?</Link>
          <Link to="/contact">Contáctanos</Link>
        </div>
      )}
    </div>
  );
}

export default NavCenter;
