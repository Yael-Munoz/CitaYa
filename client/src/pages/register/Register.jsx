import styles from './Register.module.css'
import { useRef, useState } from 'react'

function Register() {

    const [accountType, setAccountType] = useState('');
    const [isMoved, setIsMoved] = useState(true);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

	return (
		<>
            <div className={styles['register-contenedor-de-pagina']}>

                <div className={styles[isMoved ? 'pregunta-initial' : 'pregunta-moved']}>
                    <div className={styles['contenedor-de-componente-pregunta']}>
                        <h1 className={styles['register-pregunta-de-cuenta']}>¿Que desea realizar con su cuenta?</h1>

                        <div className={styles['contenedor-de-botones']}>

                            <button className={styles['register-cuenta-botones']} onClick={() => {
                                setAccountType('patient')
                                setIsMoved(false)
                            }}><i class="fa-regular fa-calendar-days"></i> Solicitar citas</button>
                            <button className={styles['register-cuenta-botones']} onClick={() => {
                                setAccountType('professional')
                                setIsMoved(false)
                            }}><i class="fa-solid fa-calendar-week"></i> Recibir citas</button>
                        </div>                        
                        
                        
                    </div>

                </div>


                {accountType === 'patient' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='patientForm' className={styles['register-patient-form']} onSubmit={handleSubmit}>

                        <label className={styles['register-label']}>Usuario</label>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'></input>

                        <label className={styles['register-label']}>Contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'></input>

                        <label className={styles['register-label']}>Re-ingrese contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Re-ingrese su contraseña'></input>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='patientForm'><i class="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

                 {accountType === 'professional' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='professionalForm' className={styles['register-professional-form']} onSubmit={handleSubmit}>
                        <label className={styles['register-label']}>Nombre completo</label>
                        <input className={styles['register-input']} type='text' ref={nameRef} placeholder='Ingrese su nombre completo'></input>

                        <label className={styles['register-label']}>Correo</label>
                        <input className={styles['register-input']} type='text' ref={emailRef} placeholder='Ingrese su correo electronico'></input>

                        <label className={styles['register-label']}>Usuario</label>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'></input>

                        <label className={styles['register-label']}>Contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'></input>

                        <label className={styles['register-label']}>Re-ingrese contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Re-ingrese su contraseña'></input>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='professionalForm'><i class="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

            </div>
        
		</>
	)
}

export default Register
