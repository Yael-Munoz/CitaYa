import { Link } from 'react-router-dom';
import styles from './navbar-center.module.css';
import { useState } from 'react';

function NavCenter() {
  const [menuDisplay, setMenuDisplay] = useState(false);

  return (
    <div className={styles['source-contenedor-barra-nav']}>
      <div className={styles['source-contenedor-barra-nav-interno']}>
        {/* Logo + Nombre */}
        <Link to="/" className={styles['source-contenedor-nav-bar-izquierdo']}>
          <div className={styles['source-contenedor-nav-bar-izquierdo-logo']}></div>
          <p className={styles['source-contenedor-nav-bar-izquierdo-texto']}>CitaYa</p>
        </Link>

        {/* Enlaces normales (solo en escritorio) */}
        <div className={styles['source-contenedor-nav-bar-centro']}>
          <Link to="/about-us" className={styles['source-contenedor-nav-bar-centro-texto']}>
            ¿Quiénes somos?
          </Link>
          <Link to="/contact" className={styles['source-contenedor-nav-bar-centro-texto']}>
            Contáctanos
          </Link>
        </div>

        {/* Botón hamburguesa (solo en móvil) */}
        <div
          className={styles['source-boton-menu-desplegable']}
          onClick={() => setMenuDisplay(!menuDisplay)}
          >
          <i className="fa-solid fa-bars"></i>
        </div>

      </div>


      {/* Menú desplegable (solo en móvil) */}
      {menuDisplay && (
        <div className={styles['source-menu-movil']}>
          <Link to="/about-us">¿Quiénes somos?</Link>
          <Link to="/contact">Contáctanos</Link>
        </div>
      )}
    </div>
  );
}

export default NavCenter;
