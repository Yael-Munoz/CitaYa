import { useNavigate } from 'react-router-dom';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';
import styles from './services.module.css';

function Services() {
  const navigate = useNavigate();

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
            <i className="fa-solid fa-user-doctor"></i>
            <h3>Doctores</h3>
            <p>Consulta médica general, especialistas y seguimiento clínico.</p>
          </div>
          <div className={styles['servicio-card-dentista']} data-aos="fade-up" data-aos-delay="100">
            <i className="fa-solid fa-tooth"></i>
            <h3>Dentistas</h3>
            <p>Odontología preventiva, estética y tratamientos especializados.</p>
          </div>
          <div className={styles['servicio-card-barbero']} data-aos="fade-up" data-aos-delay="200">
            <i className="fa-solid fa-scissors"></i>
            <h3>Barberos</h3>
            <p>Estilo personalizado, cortes modernos y cuidado de la barba.</p>
          </div>
          <div className={styles['servicio-card-nutriologo']} data-aos="fade-up" data-aos-delay="300">
            <i className="fa-solid fa-apple-whole"></i>
            <h3>Nutriólogos</h3>
            <p>Planes alimenticios, control de peso y asesoría nutricional.</p>
          </div>
        </section>

        <section className ={styles['cta-cli']} data-aos= "fade-in">
            <h2>¿Buscas agendar citas?</h2>
            <p>Regístrate y empieza a agendar con tiempo tus pendientes desde nuestra plataforma</p>
            <button className={styles['cta-button-cli']} onClick={() => navigate('/register')}>
            Crear cuenta personal
          </button>
        </section>

        <section className={styles['cta-pro']} data-aos="fade-in">
          <h2>¿Eres profesional?</h2>
          <p>Regístrate y gestiona tus horarios, clientes y citas desde nuestra plataforma.</p>
          <button className={styles['cta-button-pro']} onClick={() => navigate('/register')}>
            Crear cuenta profesional
          </button>
        </section>
      </div>
    </div>
  );
}

export default Services;
