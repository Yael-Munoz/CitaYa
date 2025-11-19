import { useNavigate } from 'react-router-dom';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';
import styles from './contact.module.css';
import SupportImg from '../../assets/contact-page/support-img.png'
import Footer from '../../components/footer/Footer.jsx'


function Contact() {
    const navigate = useNavigate();

    return(
        
        <>
            <div className={styles["source-fondo"]}>
                <div className={styles["contenedor-pagina-completa"]}>
                    <NavCenter />
                    <div className={styles["hero-section"]} data-aos="fade-in">
                        <div className={styles["hero-text"]}>
                            <h2>Ponte en contacto con nosotros</h2>
                            <p>Siempre trataremos de atenderte a la brevedad posible, abajo te dejamos nuestros medios
                                de contacto en caso de tener alguna queja, sugerencia y reportar un error a nuestro
                                equipo de soporte.
                            </p>
                        </div>

                        <div className={styles["hero-img"]}>
                            <img src={SupportImg} alt="Support"/>
                        </div>

                    </div>

                    <div className={styles["contact-section"]}data-aos="fade-in" data-aos-delay="100">
                        <h3>¿Tienes dudas o sugerencias?</h3>
                        <p>Escríbenos a <a href="mailto:soporte@tusitio.com">citaya@outlook.com</a> o envíanos un mensaje directo por WhatsApp.</p>

                        <a
                            href="https://wa.me/5216641764482?text=Hola%20equipo%20de%20soporte,%20tengo%20una%20consulta..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles["whatsapp-button"]}
                        >
                            <i className="fa-brands fa-whatsapp"></i> Enviar mensaje por WhatsApp
                        </a>
                    </div>

                </div>
            </div>

            <Footer/>
        </>

    );

}

export default Contact;