import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './services.module.css';
import doctor from "../../assets/services-page/doctor.jpg";
import dentista from "../../assets/services-page/dentista.webp"
import barbero from "../../assets/services-page/barbero.jpg"
import nutriologo from "../../assets/services-page/nutriologo.jpg"
import cli from "../../assets/services-page/cli.png"
import pro from "../../assets/services-page/pro.png"

function Services() {
  const navigate = useNavigate();

    useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className={styles['source-fondo']}>
      <div className={styles['source-contenedor-de-pagina-completa']}>
        <NavCenter />

        <section className={styles['hero']}>
          <h1 className={styles['titulo']}>Servicios que ofrecemos</h1>
          <p className={styles['descripcion']}>
            Conecta con profesionales certificados y agenda tus citas de forma rápida, segura y personalizada.
          </p>
        </section>

        <section className={styles['servicios-grid']}>
          <div className={styles['servicio-card-doctor']} data-aos="fade-up">
            <div className={styles['img-wrapper-doctor']}>
              <img src={doctor} alt="doctor" className={styles['servicio-img']} />
            </div>
            <h3>Doctores</h3>
            <p>Consulta médica general, especialistas y seguimiento clínico.</p>
          </div>
          <div className={styles['servicio-card-dentista']} data-aos="fade-up" data-aos-delay="100">
            <div className={styles['img-wrapper-dentista']}>
              <img src={dentista} alt="dentista" className={styles['servicio-img']} />
            </div>
            <h3>Dentistas</h3>
            <p>Odontología preventiva, estética y tratamientos especializados.</p>
          </div>
          <div className={styles['servicio-card-barbero']} data-aos="fade-up" data-aos-delay="200">
            <div className={styles['img-wrapper-barbero']}>
              <img src={barbero} alt="barbero" className={styles['servicio-img']} />
            </div>
            <h3>Barberos</h3>
            <p>Estilo personalizado, cortes modernos y cuidado de la barba.</p>
          </div>
          <div className={styles['servicio-card-nutriologo']} data-aos="fade-up" data-aos-delay="300">
            <div className={styles['img-wrapper-nutriologo']}>
              <img src={nutriologo} alt="nutriologo" className={styles['servicio-img']} />
            </div>
            <h3>Nutriólogos</h3>
            <p>Planes alimenticios, control de peso y asesoría nutricional.</p>
          </div>
        </section>

        <section className ={styles['cta-cli']} data-aos="fade-down" data-aos-delay="400">
          <div className={styles['img-wrapper-cli']}>
            <img src={cli} alt="cli" className={styles['servicio-img-cli']} />
          </div>
          <div className={styles["cta-cli-contenido"]}>
              <h2>¿Buscas agendar citas?</h2>
              <p>Regístrate y empieza a agendar con tiempo tus pendientes desde nuestra plataforma</p>
              <button className={styles['cta-button-cli']} onClick={() => navigate('/register')}>
              <i class="fa-solid fa-user"></i> Crear cuenta personal
              </button>
          </div>
        </section>

        <section className={styles['cta-pro']} data-aos="fade-down" data-aos-delay="100">
          <div className={styles['img-wrapper-pro']}>
            <img src={pro} alt="pro" className={styles['servicio-img-pro']} />
          </div>
          <div className="cta-pro-contenido">
            <h2>¿Eres profesional?</h2>
            <p>Regístrate y gestiona tus horarios, clientes y citas desde nuestra plataforma.</p>
            <button className={styles['cta-button-pro']} onClick={() => navigate('/register')}>
              <i class="fa-solid fa-user-tie"></i> Crear cuenta profesional
            </button>
          </div>
          
        </section>
      </div>
    </div>
  );
}

export default Services;
