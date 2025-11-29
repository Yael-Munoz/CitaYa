import { useState, useRef, useEffect } from 'react';
import ClientHeader from '../client_header/ClientHeader';
import styles from './ClientDashboard.module.css';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePickerCustom.css';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/apiFetch';

function ClientDashboard() {
  Modal.setAppElement('#root');
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState(['', '', '']);
  const [events, setEvents] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const proUsernameRef = useRef(null);
  const clientPhoneRef = useRef(null);
  const [startDate, setStartDate] = useState('');
  const eventDescriptionRef = useRef('No se incluyó descripcion');

  // Load client profile
  useEffect(() => {
    apiFetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setClientName(data.name || data.username || 'Cliente');
        setClientPhone(data.phone || ''); // autofill phone
      })
      .catch(error => {});
  }, []);

  // Load client events
  useEffect(() => {
    apiFetch('http://localhost:3000/client/events', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setEvents(data);
      })
      .catch(error => {});
  }, []);

  function setErrorAtIndex(index, message) {
    setErrors(prev => {
      const copy = [...prev];
      copy[index] = message;
      return copy;
    });
  }

  function handleLogout() {
    fetch('http://localhost:3000/client/log-out', {
      method: 'POST',
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('We had trouble signing you out');
        navigate('/');
      })
      .catch(error => {
        navigate('/');
      });
  }

  const handleDeleteEvent = async (id) => {
    try {
      const res = await apiFetch('http://localhost:3000/dashboard/delete-event', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
    } catch (err) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(['', '', '', '']);

    const userForm = {
      proUsername: proUsernameRef.current.value,
      clientPhone: clientPhone,
      startDate: startDate,
      eventDescription: eventDescriptionRef.current.value
    };

    if (!userForm.proUsername) {
      setErrorAtIndex(0, 'El usuario del profesional es obligatorio!');
      return;
    }

    if (!userForm.clientPhone || userForm.clientPhone.length < 10 || userForm.clientPhone.length > 12) {
      setErrorAtIndex(1, 'Tu número de telefono es obligatorio y tiene que ser valido!');
      return;
    }

    if (!(startDate instanceof Date)) {
      setErrorAtIndex(2, 'Selecciona una fecha valida del calendario!');
      return;
    }

    apiFetch('http://localhost:3000/client/confirmar-cita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userForm)
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status === 404) {
          setErrorAtIndex(0, data.message);
        }
        if (!res.ok) throw new Error('Could not confirm event');

        setEvents([...events, data]);
        setModalOpen(false);
      })
      .catch(error => {});
  };

  return (
    <div className={styles['dashboard-wrapper']}>
      <div className={styles['header']}>
        <ClientHeader />
      </div>

      <main className={styles['dashboard-main']}>
        <section className={styles['welcome-section']}>
          <h1 className={styles['welcome-title']}>Bienvenido de nuevo, {clientName}!</h1>
          <p className={styles['welcome-subtitle']}>
            Aquí puedes ver tus próximas citas y administrar tu cuenta fácilmente.
          </p>
        </section>

        <section className={styles['appointments-section']}>
          <h2>Tus próximas citas</h2>
          {events.length === 0 ? (
            <p>No tienes citas programadas.</p>
          ) : (
            events.map((event, idx) => {
              const start = new Date(event.start);
              const end = event.end ? new Date(event.end) : null;

              let timeDisplay;
              if (event.allDay) {
                timeDisplay = 'Todo el día';
              } else if (end) {
                timeDisplay = `${start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
              } else {
                const fallbackEnd = new Date(start.getTime() + 30 * 60000);
                timeDisplay = `${start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - ${fallbackEnd.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
              }

              return (
                <div key={idx} className={styles['appointment-card']}>
                  <div className={styles['contenedor-boton-para-eliminar']}>
                    <button
                      className={styles['boton-para-eliminar']}
                      onClick={() => handleDeleteEvent(event._id)}  
                    >
                      X
                    </button>
                  </div>
                  <p><strong>Fecha:</strong> {start.toLocaleDateString('es-ES')}</p>
                  <p><strong>Hora:</strong> {timeDisplay}</p>
                  <p><strong>Profesional:</strong> {event.proUsername || 'N/A'}</p>
                  <p><strong>Numero telefonico:</strong> {event.proPhone || 'N/A'}</p>
                  <p><strong>Descripción:</strong> {event.description}</p>
                </div>
              );
            })
          )}
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
          <input ref={proUsernameRef} placeholder="Usuario del profesionista" />

          <span className={`${!errors[1] ? styles['client-dashboard-errors-message-inactive'] : styles['client-dashboard-errors-message-active']}`}>{errors[1]}</span>
          <input 
            ref={clientPhoneRef} 
            placeholder="Mi Número Telefónico (XXX-XXX-XXXX)" 
            value={clientPhone} 
            onChange={(e) => setClientPhone(e.target.value)}
          />

          <label htmlFor="fecha" className={styles['date-label']}>Selecciona día y hora</label>
          <span className={`${!errors[2] ? styles['client-dashboard-errors-message-inactive'] : styles['client-dashboard-errors-message-active']}`}>{errors[2]}</span>
          <DatePicker
            id="fecha"
            selected={startDate}
            locale={es}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeCaption='Hora'
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="hh:mm aa"
            placeholderText="Elegir fecha y hora"
            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          />

          <textarea ref={eventDescriptionRef} rows={3} placeholder="Comentarios adicionales"></textarea>

          <button className={styles['confirmar-cita-button']} type="submit">
            Confirmar cita
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ClientDashboard;
