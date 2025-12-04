import styles from './ProHeader.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-transparente.png'


function ProHeader() {

    
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
                <Link className={styles['header-texto']} to='/dashboard'>Dashboard</Link>
                <Link className={styles['header-texto']} to='/book-appointment'>Calendario</Link>
                <div className={styles['header-menu']}onClick={() => setMenuDisplay(!menuDisplay)}>
                    {menuDisplay ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-bars"></i>)}
                </div>
            </nav>

            

        </header>
        
        <div className={`${styles['menu-desplegable']} 
        ${menuDisplay ? styles['menu-abierto'] : ''}`}>
            <button className={styles['boton-cerrar-menu']} onClick={() => setMenuDisplay(false)}>X</button>
            <h2>Menú</h2>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/book-appointment'>Calendario</Link>
        </div>


        
        
        </>
    );
}

export default ProHeader