import styles from './Register.module.css'
import { useRef, useState } from 'react'

function Register() {

    const [accountType, setAccountType] = useState('');
    const [isMoved, setIsMoved] = useState(true);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    

    

    const handleSubmitPatient = (e) => {
        e.preventDefault();

        const user = userRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        if(password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        const PatientData = {
            role: 'patient',
            user,
            password,
            confirmPassword     
        }

        fetch('http://localhost:3000/', {
            method: 'GET',
        })
        .then(res => {
            if(!res.ok) {
                console.log('Something went wrong');
            }
            else{
                return res.json();
            }
        })
        .then(data => console.log(data))
        .catch(err => {
            console.log('Error: ' + err);
        });


        console.log('Se registro con cuenta de paciente');

    }

        const handleSubmitPro = (e) => {
        e.preventDefault();

        if(passwordRef !== confirmPasswordRef) {
            console.log('Passwords do not match');
            return;
        }

        const ProData = {
            role: 'pro',
            nameRef,
            emailRef,
            userRef,
            passwordRef,
            confirmPasswordRef
        }


        console.log('Se registro con cuenta de profesional');
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
                            }}><i className="fa-regular fa-calendar-days"></i> Solicitar citas</button>
                            <button className={styles['register-cuenta-botones']} onClick={() => {
                                setAccountType('professional')
                                setIsMoved(false)
                            }}><i className="fa-solid fa-calendar-week"></i> Recibir citas</button>
                        </div>                        
                        
                        
                    </div>

                </div>


                {accountType === 'patient' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='patientForm' className={styles['register-patient-form']} onSubmit={handleSubmitPatient}>

                        <label className={styles['register-label']}>Usuario</label>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'></input>

                        <label className={styles['register-label']}>Contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'></input>

                        <label className={styles['register-label']}>Re-ingrese contraseña</label>
                        <input className={styles['register-input']} type='password' ref={confirmPasswordRef} placeholder='Re-ingrese su contraseña'></input>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='patientForm'><i className="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

                 {accountType === 'professional' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='professionalForm' className={styles['register-professional-form']} onSubmit={handleSubmitPro}>
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

                    <button className={styles['submit-boton']} type='submit' form='professionalForm'><i className="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

            </div>
        
		</>
	)
}

export default Register
