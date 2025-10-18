import styles from './BookAppointment.module.css'
import Header from '../../components/header/Header';

function BookAppointment() {


    return(
        <>
        <Header/>
        <h1>Mi Calendario</h1>
        <div className={styles['contenedor-de-calendario']}>

        </div>
        
        </>
    );
}




export default BookAppointment