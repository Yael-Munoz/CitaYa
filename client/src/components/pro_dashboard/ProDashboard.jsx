import styles from './ProDashboard.module.css';
import ProHeader from '../pro_header/ProHeader';
import { useNavigate } from 'react-router-dom';

function ProDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/');
    
  };

  const handleViewClients = () => {
    console.log('Ver lista de clientes');
    
  };

  return (

    <>
        <ProHeader/>
        <div className={styles['contenedor-de-hoja']}>

          <div className={styles['pro-dashboard-container']}>

        <header className={styles['pro-dashboard-header']}>
            <h2>Panel Profesional</h2>
            <p>Bienvenido, Dr. Pérez</p>
        </header>

        <section className={styles['pro-dashboard-section']}>
            <h3>Próximas citas</h3>
            <ul className={styles['pro-appointment-list']}>
            <li>Martes 29 Oct - 10:00 AM con Juan Martínez</li>
            <li>Miércoles 30 Oct - 1:00 PM con Ana López</li>
            <li>Viernes 1 Nov - 9:00 AM con Carlos García</li>
            </ul>
        </section>

        <div className={styles['pro-button-group']}>
            <button className={styles['pro-dashboard-btn']} onClick={() => navigate('/book-appointment')}>
            Agendar nueva cita
            </button>

            <button className={styles['pro-dashboard-btn-alt']} onClick={handleViewClients}>
            Ver clientes
            </button>
        </div>

        <section className={styles['pro-dashboard-section']}>
            <h3>Resumen semanal</h3>
            <p><strong>Total citas:</strong> 12</p>
            <p><strong>Canceladas:</strong> 2</p>
            <p><strong>Confirmadas:</strong> 10</p>
        </section>

        <button className={styles['pro-logout-btn']} onClick={handleLogout}>
            Cerrar sesión
        </button>

        </div>

        </div>
        
    </>
    
  );
}

export default ProDashboard;