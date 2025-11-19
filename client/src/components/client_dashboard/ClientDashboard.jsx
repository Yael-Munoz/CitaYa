import { useState, useRef } from 'react';
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
  
  const [errors, setErrors] = useState(['', '', '']);

  function setErrorAtIndex(index, message) {
    setErrors(prev => {
    const copy = [...prev];
    copy[index] = message;
    return copy;
    });
  }

  const proUsernameRef = useRef(null);
  const clientPhoneRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');
  const eventDescriptionRef = useRef('No se incluyó descripcion');



  function handleLogout() {

    fetch('http://localhost:3000/client/log-out', {
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

    setErrors(['', '', '']);
    console.log('Datos del formulario:');
    console.log('Fecha seleccionada:', selectedDate);


    const userForm = {
      proUsername: proUsernameRef.current.value,
      clientPhone: clientPhoneRef.current.value,
      selectedDate: selectedDate,
      eventDescription: eventDescriptionRef.current.value
    }

    if(!userForm.proUsername) {
      setErrorAtIndex(0, 'El usuario del profesional es obligatorio!');
      return;
    }

    if(!userForm.clientPhone || userForm.clientPhone.length < 10 || userForm.clientPhone.length > 12) {
      setErrorAtIndex(1, 'Tu número de telefono es obligatorio y tiene que ser valido!');
      return;
    }
    
    if(!(selectedDate instanceof Date)) {
      setErrorAtIndex(2, 'Selecciona una fecha valida del calendario!');
    }

    fetch('http://localhost:3000/client/confirmar-cita', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
      body: JSON.stringify({userForm})
    })
    .then(async (res) => {
      const data = await res.json();
      if(!res.ok) {
        throw new Error('Could not confirm event');
      }
      console.log('Event successfully sent');
    })
    .catch(error => {
      console.log(error);
    });

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
          <span className={`${!errors[0] ? styles['client-dashboard-errors-message-inactive'] : styles['client-dashboard-errors-message-active']}`}>{errors[0]}</span>
          <input ref={proUsernameRef} placeholder="Usuario del profesionista"/>
          
          
          <span className={`${!errors[1] ? styles['client-dashboard-errors-message-inactive'] : styles['client-dashboard-errors-message-active']}`}>{errors[1]}</span>
          <input ref={clientPhoneRef} placeholder="Mi Número Telefónico (XXX-XXX-XXXX)"/>
          
          
          
          <label htmlFor="fecha" className={styles['date-label']}>Selecciona día y hora</label>
          <span className={`${!errors[2] ? styles['client-dashboard-errors-message-inactive'] : styles['client-dashboard-errors-message-active']}`}>{errors[2]}</span>
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
