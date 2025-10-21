import styles from './BookAppointment.module.css';
import Header from '../../components/header/Header';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Para accesibilidad

function BookAppointment() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailModalOpen, setEventDetailModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isMobile = window.innerWidth < 768;
  const initialView = isMobile ? 'timeGridWeek' : 'dayGridMonth';

  // Crear evento
  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setTitle('');
    setDescription('');
    setModalOpen(true);
  };

  const handleEventAdd = () => {
    if (title && selectedInfo) {
      const newEvent = {
        title: title,
        start: selectedInfo.start,
        end: selectedInfo.end,
        allDay: selectedInfo.allDay,
        extendedProps: {
          description: description,
        },
      };
      setEvents([...events, newEvent]);
      setModalOpen(false);
      setSelectedInfo(null);
      setTitle('');
      setDescription('');
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
        e => !(e.start.getTime() === selectedEvent.start.getTime() && e.title === selectedEvent.title)
      ));
      setSelectedEvent(null);
      setEventDetailModalOpen(false);
    }
  };

  return (
    <div className={styles['contenedor-pagina']}>
      <Header />

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
            selectLongPressDelay={250} // Tap largo en móvil
            slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
            eventTimeFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
            eventClick={handleEventClick} // click para ver detalles
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
