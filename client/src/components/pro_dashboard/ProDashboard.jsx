import styles from './ProDashboard.module.css';
import ProHeader from '../pro_header/ProHeader';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiFetch';

function ProDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [proName, setProName] = useState('');

  useEffect(() => {
    // Load professional's profile
    apiFetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setProName(data.name || data.username || 'Profesional');
      })
      .catch(error => {
        //console.error(error)
      });
  }, []);

  useEffect(() => {
    // Load events
    apiFetch('http://localhost:3000/pro/events', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setEvents(data);
      })
      .catch(error => {
        //console.log(error)
        });
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:3000/dashboard', {
      method: 'POST',
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          //console.log(data);
          throw new Error('We had trouble signing you out');
        }
        //console.log('Log out successful');
        navigate('/');
      })
      .catch(error => {
        //console.log(error);
      });
    //console.log('Cerrando sesión...');
    navigate('/');
  };

  const handleViewClients = () => {
    //console.log('Ver lista de clientes');
  };

  return (
    <>
      <ProHeader />
      <div className={styles['contenedor-de-hoja']}>
        <div className={styles['pro-dashboard-container']}>
          <header className={styles['pro-dashboard-header']}>
            <h2>Panel Profesional</h2>
            <p>Bienvenido, {proName}</p>
          </header>

          <section className={styles['pro-dashboard-section']}>
            <h3>Próximas citas</h3>
            <ul className={styles['pro-appointment-list']}>
              {events.length === 0 ? (
                <li>No tienes citas programadas.</li>
              ) : (
                events.map((event, idx) => {
                  const start = new Date(event.start);
                  const end = event.end ? new Date(event.end) : null;

                  let timeDisplay;
                  if (event.allDay) {
                    timeDisplay = 'Todo el día';
                  } else if (end) {
                    timeDisplay = `${start.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} - ${end.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}`;
                  } else {
                    const fallbackEnd = new Date(start.getTime() + 30 * 60000);
                    timeDisplay = `${start.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} - ${fallbackEnd.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}`;
                  }

                  return (
                    <li key={idx}>
                      {start.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short'
                      })}{' '}
                      - {timeDisplay} con {event.clientId?.username || 'Cliente'}
                    </li>
                  );
                })
              )}
            </ul>
          </section>

          <div className={styles['pro-button-group']}>
            <button
              className={styles['pro-dashboard-btn']}
              onClick={() => navigate('/book-appointment')}
            >
              Agendar nueva cita
            </button>

            <button
              className={styles['pro-dashboard-btn-alt']}
              onClick={handleViewClients}
            >
              Ver clientes
            </button>
          </div>

          

          <button className={styles['pro-logout-btn']} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}

export default ProDashboard;