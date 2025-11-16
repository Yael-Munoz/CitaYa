import { Link } from 'react-router-dom';
import styles from './navbar-center.module.css';
import { useState } from 'react';
import logoCalendario from "../../assets/navbar-center/logo-calendario.png"

function NavCenter() {
  const [menuDisplay, setMenuDisplay] = useState(false);

  return (
    <div className={styles['source-contenedor-barra-nav']}>
      <div className={styles['source-contenedor-barra-nav-interno']}>
        {/* Logo + Nombre */}
        <Link to="/" className={styles['source-contenedor-nav-bar-izquierdo']}>
          <img src={logoCalendario} alt="logoCalendario" className={styles['img-logo-calendario']} />
          <p className={styles['source-contenedor-nav-bar-izquierdo-texto']}>CitaYa</p>
        </Link>

        {/* Enlaces normales (solo en escritorio) */}
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

        <div className={styles['contenedor-botones-login-register']}>
            <Link to="/login" className={styles['source-boton-login']}>
            <i className={styles["fa-solid fa-arrow-right-to-bracket"]}></i> Iniciar sesión
          </Link>
          <Link to="/register" className={styles['source-boton-register']}>
              <i className={styles["fa-solid fa-user-plus"]}></i> Registrate
          </Link>
        </div>
        

        {/* Botón hamburguesa (solo en móvil) */}
        <div
          className={styles['source-boton-menu-desplegable']}
          onClick={() => setMenuDisplay(!menuDisplay)}
          >
          <i className={styles["fa-solid fa-bars"]}></i>
        </div>

      </div>


      {/* Menú desplegable (solo en móvil) */}
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
