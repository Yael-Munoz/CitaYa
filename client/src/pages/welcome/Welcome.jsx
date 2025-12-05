import styles from './Welcome.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';
import Logo from '../../assets/welcome-page/logo-transparente.png'
import Footer from '../../components/footer/Footer.jsx'

import dominadasVideo from '../../assets/welcome-page/videos/dominadas-vertical.mp4';
import squatVideo from '../../assets/welcome-page/videos/squat-vertical.mp4';
import deadliftVideo from '../../assets/welcome-page/videos/pr-dl-vertical.mp4'



function Welcome() {

    const navigate = useNavigate();

    const [currentSlide, setSlide] = useState(1);
    const slides = [<div className={`${styles['source-slide1']} ${styles['source-slides']}`}>
        <video 
        src={dominadasVideo}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className={styles['videos']}/>
    </div>,
    <div className={`${styles['source-slide2']} ${styles['source-slides']}`}>
        <video 
        src={deadliftVideo}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className={styles['videos']}/>
    </div>,
    <div className={`${styles['source-slide3']} ${styles['source-slides']}`}>
        <video 
        src={squatVideo}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className={styles['videos']}/>
    </div>];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((prev) => (prev + 1) % slides.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [slides.length]);

    




    return(
        <>

        <div className={styles['source-fondo']}>
            <div className={styles['source-contenedor-de-pagina-completa']}>
                <NavCenter />
                <div className={styles['source-bloque1']}>           
                    <div className={styles['source-contenedor-de-bienvenido']}>
                        <img src={Logo} alt="Logo" className={styles['logo-img']} data-aos="fade-down"/>
                        <p className={styles['source-texto-descripcion-de-bienvenido']} data-aos="fade-down" data-aos-delay="200">Bienvenido a CitaYa, el portal donde puedes organizar el tiempo a tu antojo</p>
                        
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
        <Footer />

        </>
        
    );
}



export default Welcome;


