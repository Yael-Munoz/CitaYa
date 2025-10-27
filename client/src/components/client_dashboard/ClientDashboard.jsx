import Header from '../header/Header';
import styles from './ClientDashboard.module.css';

function ClientDashboard() {
    return (
        <div className={styles['dashboard-wrapper']}>
            <Header />
            
            <main className={styles['dashboard-main']}>
                <section className={styles['welcome-section']}>
                    <h1 className={styles['welcome-title']}>Bienvenido de nuevo 👋</h1>
                    <p className={styles['welcome-subtitle']}>
                        Aquí puedes ver tus próximas citas y administrar tu cuenta fácilmente.
                    </p>
                </section>

                <section className={styles['appointments-section']}>
                    <h2>Tus próximas citas</h2>
                    <div className={styles['appointment-card']}>
                        <p><strong>Fecha:</strong> 28 Octubre 2025</p>
                        <p><strong>Hora:</strong> 3:00 PM</p>
                        <p><strong>Profesional:</strong> Dra. López</p>
                    </div>
                </section>

                <section className={styles['options-section']}>
                    <button className={styles['action-button']}><i class="fa-solid fa-calendar"></i> Agendar cita</button>
                    <button className={styles['logout-button']}><i class="fa-solid fa-door-open"></i> Cerrar Sesion</button>
                </section>
            </main>
        </div>
    );
}

export default ClientDashboard;