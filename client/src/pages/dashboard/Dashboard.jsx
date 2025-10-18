import styles from './Dashboard.module.css'
import Header from '../../components/header/Header'

function Dashboard() {


    return(

        <>
        <Header/>

        <h1 className={styles['dashboard-bienvenido-texto']}>Bienvenido Usuario!</h1>
        <div className={styles['dashboard-contenedor-de-primera-seccion']}>
            <h2 className={styles['proximas-citas-texto']}>Tus proximas citas:</h2>
            <div className={styles['contenedor-de-tarjetas-de-citas']}>
                <ul>
                    <li>
                        <p>Fecha y hora: </p>
                        <p>Cliente: </p>
                        <p>Estado: (Confirmado/Pendiente)</p>
                        <button>Ver detalles</button>
                        <button>Cancelar cita</button>

                        
                    </li>
                </ul>
            </div>
            
        </div>
        <a href='/book-appointment' className={styles['boton-agendar-citas-nuevas']}>Agendar Citas Nuevas</a>
        
        </>



    );
}


export default Dashboard