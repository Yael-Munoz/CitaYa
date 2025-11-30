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
import { API_BASE_URL } from '../../config/apiConfig';


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
  const [clientPhone, setClientPhone] = useState('');

  const isMobile = window.innerWidth < 768;
  const initialView = isMobile ? 'timeGridWeek' : 'dayGridMonth';

  useEffect(() => {
    apiFetch(API_BASE_URL + '/pro/events', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();

        const formatted = data.map(event => ({
          id: event._id,
          title: event.clientId?.username || 'Cita',
          start: event.start,
          end: event.end,
          extendedProps: { 
            description: event.description,
            clientPhone: event.clientPhone || 'N/A'
          }
        }));

        setEvents(formatted);
      })
      .catch(error => {});
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setTitle('');
    setDescription('');
    setClientUser('');
    setClientPhone('');
    setModalOpen(true);
  };

  const handleEventAdd = async () => {
    if (title && selectedInfo) {
      const newEvent = {
        title,
        clientUsername: clientUser,
        clientPhone,
        start: selectedInfo.start.toISOString(),
        end: selectedInfo.end ? selectedInfo.end.toISOString() : null,
        description
      };

      try {
        const res = await apiFetch(API_BASE_URL + '/pro/add-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent)
        });

        const data = await res.json();

        if (res.status === 404) {
          setClientError(data.message);
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to save event');
        }

        setEvents([...events, {
          id: data._id,
          title: clientUser,
          start: data.start,
          end: data.end,
          extendedProps: { 
            description: data.description,
            clientPhone: data.clientPhone || 'N/A'
          }
        }]);

        setModalOpen(false);
        setSelectedInfo(null);
        setTitle('');
        setDescription('');
        setClientUser('');
        setClientPhone('');
        setClientError('');
      } catch (error) {}
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setEventDetailModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      apiFetch(API_BASE_URL + '/dashboard/delete-event', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedEvent.id })
      })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setEvents(events.filter(e => e.id !== selectedEvent.id));
        selectedEvent.remove();
        setSelectedEvent(null);
        setEventDetailModalOpen(false);
      })
      .catch(error => {});
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
            <input
              type="text"
              placeholder="Usuario del cliente"
              value={clientUser}
              onChange={(e) => setClientUser(e.target.value)}
              className={styles['input-evento']}
            />
            <input
              type="text"
              placeholder="Teléfono del cliente"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className={styles['input-evento']}
            />

            <textarea
              placeholder="Descripción del evento (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles['input-evento']}
              rows={3}
            />

            <span className={styles['error-message']}>{clientError}</span>

            <div className={styles['botones-modal']}>
              <button onClick={handleEventAdd} className={styles['boton-agregar']}>
                Agregar
              </button>
              <button onClick={() => setModalOpen(false)} className={styles['boton-cancelar']}>
                Cancelar
              </button>
            </div>
          </Modal>

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
            <p className={styles['descripcion-evento']}>
              Teléfono del cliente: {selectedEvent?.extendedProps.clientPhone || 'N/A'}
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
