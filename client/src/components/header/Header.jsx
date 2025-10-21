import styles from './Header.module.css'
import { useState, useEffect } from 'react';


function Header() {

    const [menuDisplay, setMenuDisplay] = useState(false);



    return(
        <>
        
        <header className={styles['header-contenedor']}>
            

            <nav className={styles['header-nav-links']}>
                <div className={styles['header-logo']}>CitaYa</div>
                <a className={styles['header-texto']} href='/dashboard'>Dashboard</a>
                <a className={styles['header-texto']} href='/book-appointment'>Calendario</a>
                <a className={styles['header-texto']} href='/profile'>Perfil</a>
                <div className={styles['header-menu']} onClick={() => setMenuDisplay(!menuDisplay)}></div>
            </nav>

            

        </header>
        
        <div className={`${styles['menu-desplegable']} 
        ${menuDisplay ? styles['menu-abierto'] : ''}`}>
            <div className={styles['menu-logo']}>Logo</div>
            <button className={styles['boton-cerrar-menu']} onClick={() => setMenuDisplay(false)}>X</button>
            <a href='#'>Contactanos</a>
            <a href='/profile'>Profile</a>
            <a href='/dashboard'>Dashboard</a>
            <a href='/book-appointment'>Citas</a>
        </div>


        
        
        </>
    );

}


export default Header