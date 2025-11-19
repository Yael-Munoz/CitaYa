import { useState } from 'react';
import ClientHeader from '../client_header/ClientHeader';
import styles from './ClientDashboard.module.css';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePickerCustom.css';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

function ClientDashboard() {
  Modal.setAppElement('#root');
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleLogout() {

    fetch('http://localhost:3000/client', {
      method: 'POST',
      credentials: 'include'
    })
    .then(async (res) => {
      if(!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error('We had trouble signing you out');
      }
      console.log('Log out successful');
      navigate('/');

    })
    .catch(error => {
      console.log(error);
    });
    console.log('Cerrando sesión...');
    navigate('/');
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:');
    console.log('Fecha seleccionada:', selectedDate);
    setModalOpen(false);
  };

  return (
    <div className={styles['dashboard-wrapper']}>
      <ClientHeader/>

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
          <button 
            className={styles['action-button']} 
            onClick={() => setModalOpen(true)}
          >
            <i className="fa-solid fa-calendar"></i> Agendar cita
          </button>
          <button className={styles['logout-button']} onClick={handleLogout}>
            <i className="fa-solid fa-door-open"></i> Cerrar Sesión
          </button>
        </section>
      </main>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Agendar Cita"
        className={styles['modal']}
        overlayClassName={styles['overlay']}
      >
        <form onSubmit={handleSubmit} className={styles['contenedor-dentro-de-modal']}>
          <h2 className={styles['titulo-modal']}>Agendar Cita</h2>

          <input placeholder="Usuario del profesionista" required />
          <input placeholder="Número Telefónico" required />

          <label htmlFor="fecha" className={styles['date-label']}>Selecciona día y hora</label>
          <DatePicker            
            id="fecha"
            selected={selectedDate}
            locale={es}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeCaption='Hora'
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="hh:mm aa" 
            placeholderText="Elegir fecha y hora"
            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          />

          <textarea rows={3} placeholder="Comentarios adicionales"></textarea>

          <button className={styles['confirmar-cita-button']} type="submit">
            Confirmar cita
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ClientDashboard;
