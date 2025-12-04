import styles from './ClientHeader.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-transparente.png'


function ClientHeader() {

    
    const [menuDisplay, setMenuDisplay] = useState(false);
    const TodayDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric"
    });


    return(
        
        <>

        
        <header className={styles['header-contenedor']}>
            

            <nav className={styles['header-nav-links']}>
                <div className={styles['logo-date']}>
                    <img className={styles['header-logo']} src={Logo} alt= 'logo'></img>
                    <div className={styles['date']}>Hoy: {TodayDate}</div>
                </div>
                {/*<div className={styles['header-menu']}onClick={() => setMenuDisplay(!menuDisplay)}>
                    {menuDisplay ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-bars"></i>)}
                </div>*/}
            </nav>

            

        </header>
        
        {/*<div className={`${styles['menu-desplegable']} 
        ${menuDisplay ? styles['menu-abierto'] : ''}`}>
            <button className={styles['boton-cerrar-menu']} onClick={() => setMenuDisplay(false)}>X</button>
            <div className={styles['menu-des-texto']}>© 2025 CitaYa. Todos los derechos reservados.</div>
        </div>*/}


        
        
        </>
    );
}

export default ClientHeader