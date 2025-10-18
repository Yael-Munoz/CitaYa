import styles from './Header.module.css'


function Header() {


    return(
        <>
        
        <header className={styles['header-contenedor']}>
            

            <nav className={styles['header-nav-links']}>
                <div className={styles['header-logo']}>CitaYa</div>
                <a href='/dash'>Dashboard</a>
                <a href='/calendario'>Calendario</a>
                <a href='/perfil'>Perfil</a>
            </nav>

        </header>
        
        
        
        </>
    );

}


export default Header