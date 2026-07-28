import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Logo from '../../assets/logo-transparente.png'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config/apiConfig';

function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState(['', '']);

    function setErrorAtIndex(index, message) {
        setErrors(prev => {
            const copy = [...prev];
            copy[index] = message;
            return copy;
        })
    }

    function handleSubmitLogin(e) {
        e.preventDefault();

        setErrors(['', '']);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if(!username) {
            setErrorAtIndex(0, 'El usuario es inexistente!');
            return;
        }
        if(!password) {
            setErrorAtIndex(1, 'Revisa la contraseña!');
            return;
        }

        setLoading(true);

        const userData = {
            username,
            password
        }

        fetch(API_BASE_URL + '/login', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify(userData)
        })
        .then(async (res) => {
            const data = await res.json();
            if(!res.ok) {
                if(data.message === 'User not found') {
                    setErrorAtIndex(0, 'No se encontro ningun usuario');
                    return;
                }
                setErrorAtIndex(1, data.message);
                return;
            }
            else {
                navigate('/dashboard');
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false); 
        });
    }

    return(
        <>
        <div className={styles['contenedor-de-hoja']}>
            <Link to="/"><img src={Logo} className={styles['contenedor-hoja-logo']} alt="Logo"/></Link>
            <h1 className={styles['titulo']}>Iniciar Sesión</h1>
            <div className={styles['contenedor-de-login-y-boton']}>
                <div className={styles['contenedor-de-login']}>

                    <form id='iniciar-sesion-forma' className={styles['iniciar-sesion-forma']} onSubmit={handleSubmitLogin}>

                        <label className={styles['label']}>Usuario:</label>
                        <span className={`${!errors[0] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[0]}</span>
                        <input 
                            ref={usernameRef} 
                            className={styles['input']} 
                            type='text' 
                            disabled={loading}
                            placeholder='Ingrese el usuario que desea tener'/>

                        <label className={styles['label']}>Contraseña:</label>
                        <span className={`${!errors[1] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[1]}</span>
                        <div className={styles['password-wrapper']}>
                        <input
                            ref={passwordRef}
                            className={styles['input']}
                            type={showPassword ? 'text' : 'password'}
                            disabled={loading}
                            placeholder='Ingrese su contraseña'
                            id='password'
                        />
                        <button
                            type='button'
                            className={styles['show-pass']}
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                        </div>

                    </form>

                    <button 
                        className={styles['submit-boton']} 
                        type='submit' 
                        form='iniciar-sesion-forma'
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles['spinner']}></span>
                        ) : (
                            <>
                                <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesion
                            </>
                        )}
                    </button>

                    <div className="login-register">
                        <p className={styles['label']}>¿No tienes cuenta?</p>
                        <button className={styles['register-button']} onClick={() => navigate('/register')} disabled={loading}>
                            <i className="fa-solid fa-user-plus"></i> Crear cuenta
                        </button>
                    </div>
                    
            </div>
            </div>
        </div>
        </>
    );
}

export default Login;