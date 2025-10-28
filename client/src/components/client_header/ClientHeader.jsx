import styles from './ClientHeader.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


function ClientHeader() {

    
    const [menuDisplay, setMenuDisplay] = useState(false);


    return(
        
        <>

        
        <header className={styles['header-contenedor']}>
            

            <nav className={styles['header-nav-links']}>
                <div className={styles['header-logo']}>CitaYa</div>
                <Link className={styles['header-texto']} to=''>Contactanos</Link>
                <div className={styles['header-menu']}onClick={() => setMenuDisplay(!menuDisplay)}>
                    {menuDisplay ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-bars"></i>)}
                </div>
            </nav>

            

        </header>
        
        <div className={`${styles['menu-desplegable']} 
        ${menuDisplay ? styles['menu-abierto'] : ''}`}>
            <div className={styles['menu-logo']}>Logo</div>
            <button className={styles['boton-cerrar-menu']} onClick={() => setMenuDisplay(false)}>X</button>
            <Link to=''>Contactanos</Link>
        </div>


        
        
        </>
    );
}

export default ClientHeader