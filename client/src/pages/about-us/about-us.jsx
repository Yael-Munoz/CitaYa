import styles from './about-us.module.css';
import { useNavigate } from 'react-router-dom';
import NavCenter from '../../components/navbar-center/navbar-center.jsx';
import teamwork from '../../assets/about-us-page/teamwork.png';
import check from '../../assets/about-us-page/check.png';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className={styles ["source-fondo"]}>
      <div className={styles['source-contenedor-de-pagina-completa']}>
        <NavCenter />
        <section className={styles['about-section']}>
          <div className={styles ["about-us"]}>
              <div className={styles ["about-text"]}>
                <h1 className={styles['titulo']}>Sobre Nosotros</h1>
                <p className={styles['descripcion']}>
                  Somos un equipo enfocado en crear una plataforma donde los usuarios puedan acceder a nuestra plataforma de forma gratuita para poder organizar
                  sus citas profesionales de manera eficiente y sencilla. Buscamos que nuestros clientes puedan gestionar sus horarios sin complicaciones y con total libertad
                  mediante una interfaz intuitiva y amigable, permitiendo ser mas eficientes con sus tiempos y horarios del día a día.
                </p>
            </div>
            <div className={styles['about-image']}>
              <img src ={teamwork} alt="About Us"/>
            </div>
          </div>


          <div className={styles['more-info-container']}>         
            <div className={styles['more-info-image']}>
              <img src ={check} alt="more-info"/>
            </div>

            <div className={styles['more-info-text']}>
              <div className={styles['mision']}>
                <h2>Misión</h2>
                <p>Nuestra mision es facilitar y optimizar los itinerarios de los usuarios para que nuestros usuarios
                  puedan gestionar sus citas profesionales de manera eficiente y de manera mas sencilla posible.
                </p>
              </div>

              <div className={styles['vision']}>
                <h2>Visión</h2>
                <p>Convertirnos en una de las plataformas educativas más confiables y accesibles del mundo hispano. Planemos que nuestra plataforma
                  sea reconocida por su facilidad de uso, eficiencia y capacidad para mejorar la gestión del tiempo de nuestros usuarios. De esta manera,
                  buscamos expandir nuestra base de usuarios y colaborar con profesionales y empresas para ofrecer soluciones integrales de gestión de citas.
                </p>
              </div>

              <div className={styles['valores']}>
                <h2>Valores</h2>
                 <p className={styles['centrado']}>Transparencia, eficacia y empatía</p>
              </div>
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