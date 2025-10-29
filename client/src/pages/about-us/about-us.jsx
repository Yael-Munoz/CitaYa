import styles from './about-us.module.css';
import { useNavigate } from 'react-router-dom';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="source-fondo">
      <div className={styles['source-contenedor-de-pagina-completa']}>
        <NavCenter />
        <section className={styles['about-section']}>
          <h1 className={styles['titulo']}>Sobre Nosotros</h1>
          <p className={styles['descripcion']}>
            Somos un equipo apasionado por la tecnología y la educación digital.
            Nuestro objetivo es compartir conocimiento y recursos para que más personas puedan aprender y crecer.
          </p>

          <div className={styles['info-container']}>
            <div className={styles['card']}>
              <h2>Misión</h2>
              <p>Facilitar el acceso al conocimiento a través de recursos digitales gratuitos y legales.</p>
            </div>

            <div className={styles['card']}>
              <h2>Visión</h2>
              <p>Convertirnos en una de las plataformas educativas más confiables y accesibles del mundo hispano.</p>
            </div>

            <div className={styles['card']}>
              <h2>Valores</h2>
              <ul>
                <li>Transparencia</li>
                <li>Educación libre</li>
                <li>Innovación</li>
              </ul>
            </div>
          </div>

          <button 
            className={styles['btn-volver']} 
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;