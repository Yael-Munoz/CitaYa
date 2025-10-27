import styles from './Welcome.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Welcome() {

    const navigate = useNavigate();

    const [currentSlide, setSlide] = useState(1);
    const slides = [<div className={`${styles['source-slide1']} ${styles['source-slides']}`}></div>,
                    <div className={`${styles['source-slide2']} ${styles['source-slides']}`}></div>,
                    <div className={`${styles['source-slide3']} ${styles['source-slides']}`}></div>];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [slides.length]);

    




    return(
        <>

        <div className={styles['source-fondo']}>

            <div className={styles['source-contenedor-de-pagina-completa']}>
                <div className={styles['source-bloque1']}>
                    <div className={styles['source-contenedor-barra-nav']}>
                        <div className={styles['source-contenedor-nav-bar-izquierdo']}>
                            <div className={styles['source-contenedor-nav-bar-izquierdo-logo']}></div>
                            <p className={styles['source-contenedor-nav-bar-izquierdo-texto']}>CitaYa</p>
                        </div>
                        
                        <div className={styles['source-contenedor-nav-bar-centro']}>
                            <p className={styles['source-contenedor-nav-bar-centro-texto']}>¿Quienes somos?</p>
                            <p className={styles['source-contenedor-nav-bar-centro-texto']}>Contactanos</p>
                        </div>
                        <div className={styles['source-boton-menu-desplegable']}><i class="fa-solid fa-bars"></i></div>
                    </div>
                    <div className={styles['source-contenedor-de-bienvenido']}>
                        <h1 className={styles['source-texto-de-bienvenido']}>¡Bienvenido!</h1>
                        <p className={styles['source-texto-descripcion-de-bienvenido']}>Bienvenido a CitaYa, el portal donde puedes organizar el tiempo a tu antojo</p>
                        <button className={styles['source-boton-de-inicio-de-sesion']} onClick={() => navigate('/login')}><i class="fa-solid fa-right-to-bracket"></i> Iniciar Sesion</button>
                        <p className={styles['source-texto-de-cuenta-nueva']}>¿No tienes cuenta?</p>
                        <button className={styles['source-boton-de-crear-cuenta']} onClick={() => navigate('/register')}><i class="fa-solid fa-user-plus"></i> Crear cuenta</button>
                    </div>
                </div>
                <div className={styles['source-bloque2']}>
                    <div className={styles['source-slideshow']}>
                        {slides.map((slide, index) => (
                            <div key={index} className={`${styles['source-slides-inactive']} ${index === currentSlide ? styles['source-slides-active'] : ''}`}>
                                {slide}
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>

        </div>
        
        </>
    );
}



export default Welcome;


