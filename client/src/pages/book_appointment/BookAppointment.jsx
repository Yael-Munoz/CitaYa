import styles from './BookAppointment.module.css';
import ProHeader from '../../components/pro_header/ProHeader';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';
import { apiFetch } from '../../utils/apiFetch';

Modal.setAppElement('#root');

function BookAppointment() {
  const [clientError, setClientError] = useState('');
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailModalOpen, setEventDetailModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientUser, setClientUser] = useState('');

  const isMobile = window.innerWidth < 768;
  const initialView = isMobile ? 'timeGridWeek' : 'dayGridMonth';

  // Load existing events from backend
  useEffect(() => {
    apiFetch('http://localhost:3000/pro/events', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();

        // Map backend events to FullCalendar format
        const formatted = data.map(event => ({
          title: event.clientId?.username || 'Cita',
          start: event.start,
          end: event.end,
          description: event.description
        }));

        setEvents(formatted);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Crear evento
  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setTitle('');
    setDescription('');
    setModalOpen(true);
  };

  const handleEventAdd = async () => {
    if (title && selectedInfo) {
      const newEvent = {
        title,
        clientUsername: clientUser,
        start: selectedInfo.start.toISOString(),
        end: selectedInfo.end ? selectedInfo.end.toISOString() : null,
        description
      };

      try {
        const res = await apiFetch('http://localhost:3000/pro/add-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent)
        });

        const data = await res.json();

        if (res.status === 404) {
          setClientError(data.message);
          return;
        }

        if (!res.ok) throw new Error('Failed to save event');

        setEvents([...events, {
          title: clientUser,
          start: data.start,
          end: data.end,
          description: data.description
        }]);

        setModalOpen(false);
        setSelectedInfo(null);
        setTitle('');
        setDescription('');
        setClientUser('');
        setClientError('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Mostrar detalles del evento
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setEventDetailModalOpen(true);
  };

  // Eliminar evento
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setEvents(events.filter(
        e => !(new Date(e.start).getTime() === selectedEvent.start.getTime() && e.title === selectedEvent.title)
      ));
      setSelectedEvent(null);
      setEventDetailModalOpen(false);

      apiFetch('http://localhost:3000/dashboard', {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include'
      }).
      then(res => {
        const data = res.body;
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <div className={styles['contenedor-pagina']}>
      <ProHeader />

      <section className={styles['seccion-calendario']}>
        <p className={styles['titulo-calendario']}>Mi Calendario</p>

        <div className={styles['contenedor-calendario']}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView={initialView}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            locale={esLocale}
            events={events}
            selectable={true}
            select={handleDateSelect}
            selectMirror={true}
            dayMaxEvents={true}
            editable={true}
            slotDuration="00:30:00"
            selectLongPressDelay={250}
            slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
            eventTimeFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
            eventClick={handleEventClick}
          />

          {/* Modal Crear Evento */}
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            contentLabel="Agregar Cita"
            className={styles['modal']}
            overlayClassName={styles['overlay']}
          >
            <h2 className={styles['titulo-modal']}>Agregar Evento</h2>
            <input
              type="text"
              placeholder="Nombre del evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles['input-evento']}
            />

            <span className={styles['error-message']}>
              {clientError}
            </span>
            <input
              type="text"
              placeholder="Usuario del cliente"
              value={clientUser}
              onChange={(e) => setClientUser(e.target.value)}
              className={styles['input-evento']}
            />

            <textarea
              placeholder="Descripción del evento (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles['input-evento']}
              rows={3}
            />
            <div className={styles['botones-modal']}>
              <button onClick={handleEventAdd} className={styles['boton-agregar']}>
                Agregar
              </button>
              <button onClick={() => setModalOpen(false)} className={styles['boton-cancelar']}>
                Cancelar
              </button>
            </div>
          </Modal>

          {/* Modal Detalles del Evento */}
          <Modal
            isOpen={eventDetailModalOpen}
            onRequestClose={() => setEventDetailModalOpen(false)}
            contentLabel="Detalles del Evento"
            className={styles['modal']}
            overlayClassName={styles['overlay']}
          >
            <h2 className={styles['titulo-modal']}>{selectedEvent?.title}</h2>
            <p className={styles['descripcion-evento']}>
              {selectedEvent?.extendedProps.description || ''}
            </p>
            <div className={styles['botones-modal']}>
              <button onClick={handleDeleteEvent} className={styles['boton-agregar']}>
                Eliminar
              </button>
              <button onClick={() => setEventDetailModalOpen(false)} className={styles['boton-cancelar']}>
                Cerrar
              </button>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
}

export default BookAppointment;