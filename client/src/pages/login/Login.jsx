import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    return(
        <>

        <div className={styles['contenedor-de-hoja']}>
            <h1 className={styles['titulo']}>Iniciar Sesion</h1>
            <div className={styles['contenedor-de-login-y-boton']}>
                <div className={styles['contenedor-de-login']}>

                    <form id='iniciar-sesion-forma' className={styles['iniciar-sesion-forma']}>

                        <label className={styles['label']}>Usuario</label>
                        <input className={styles['input']} type='text' placeholder='Ingrese el usuario que desea tener'></input>


                        <div className={styles['password-wrapper']}>
                        <input
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