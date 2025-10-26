import styles from './Header.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


function Header() {

    const [menuDisplay, setMenuDisplay] = useState(false);



    return(
        <>
        
        <header className={styles['header-contenedor']}>
            

            <nav className={styles['header-nav-links']}>
                <div className={styles['header-logo']}>CitaYa</div>
                <Link className={styles['header-texto']} to='/dashboard'>Dashboard</Link>
                <Link className={styles['header-texto']} to='/book-appointment'>Calendario</Link>
                <div className={styles['header-menu']} onClick={() => setMenuDisplay(!menuDisplay)}></div>
            </nav>

            

        </header>
        
        <div className={`${styles['menu-desplegable']} 
        ${menuDisplay ? styles['menu-abierto'] : ''}`}>
            <div className={styles['menu-logo']}>Logo</div>
            <button className={styles['boton-cerrar-menu']} onClick={() => setMenuDisplay(false)}>X</button>
            <Link href='#'>Contactanos</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/book-appointment'>Calendario</Link>
        </div>


        
        
        </>
    );

}


export default Header