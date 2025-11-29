import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Logo from '../../assets/logo-transparente.png'

function Login(){

    const [showPassword, setShowPassword] = useState(false);
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

        //console.log(username, password);

        if(!username || '') {
            setErrorAtIndex(0, 'El usuario es inexistente!');
            return;
        }
        if(!password || '') {
            setErrorAtIndex(1, 'Revisa la contraseña!');
            return;
        }

        const userData = {
            username,
            password
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify(userData)
        })
        .then(async (res) => {
            const data = await res.json();
            if(!res.ok) {
                //console.log('Login Failed: ', data);
                setErrorAtIndex(1, data.message);
                return;
            }
            else {
                //console.log('Login Successful', data);
                navigate('/dashboard');
            }
        })
        .catch(error => {
            //console.log(error);
        });
    }

    
    return(
        <>

        <div className={styles['contenedor-de-hoja']}>
            <img src ={Logo} alt="Logo"/> 
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
                            placeholder='Ingrese el usuario que desea tener'/>

                        <label className={styles['label']}>Contraseña:</label>
                        <span className={`${!errors[1] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[1]}</span>
                        <div className={styles['password-wrapper']}>
                        <input
                            ref={passwordRef}
                            className={styles['input']}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Ingrese su contraseña'
                            id='password'
                        />
                        <button
                            type='button'
                            className={styles['show-pass']}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                        </div>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='iniciar-sesion-forma'><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesion</button>

                    <div className="login-register">
                        <p className={styles['label']}>¿No tienes cuenta?</p>
                        <button className={styles['register-button']} onClick={() => navigate('/register')}><i className="fa-solid fa-user-plus"></i> Crear cuenta</button>
                    </div>
                    
            </div>
            </div>
            
            
        </div>
        
        
        
        </>
    );
}

export default Login