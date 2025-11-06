import styles from './Register.module.css'
import { useRef, useState } from 'react'

function Register() {

    const [accountType, setAccountType] = useState('');
    const [isMoved, setIsMoved] = useState(true);
    const [errors, setErrors] = useState(['', '', '', '']);

    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    function setErrorAtIndex(index, message) {
        setErrors(prev => {
            const copy = [...prev];
            copy[index]= message;
            return copy;
        });
    };
    

    

    const handleSubmitClient = (e) => {
        e.preventDefault();


        setErrors(['', '', '', '']);

        
        const username = userRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        const formData = {
            role: 'client',
            username,
            password,
            confirmPassword     
        }

        if(!username || username.length < 4 || username.length > 16) {
            setErrorAtIndex(0, 'El usuario es obligatorio y tiene que ser de 4 a 16 caracteres')
        }
        if( !password || !confirmPassword || password !== confirmPassword) {
            setErrorAtIndex(1, "Las contraseñas son obligatorias y deben coincidir")
            return;
        }

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(data => {
                    throw data;
                });
            }
            else{
                return res.json();
            }
        })
        .then(data => console.log('Server response: ', data))
        .catch(error => {
            console.log(error);
            setErrors(['Registration failed']);
        });

    }

        const handleSubmitPro = (e) => {
        e.preventDefault();

        setErrors(['', '', '', '']);

        if(passwordRef !== confirmPasswordRef) {
            console.log('Passwords do not match');
            return;
        }

        const ProData = {
            role: 'pro',
            nameRef,
            phoneRef,
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
                                setAccountType('client')
                                setIsMoved(false)
                            }}><i className="fa-regular fa-calendar-days"></i> Solicitar citas</button>
                            <button className={styles['register-cuenta-botones']} onClick={() => {
                                setAccountType('professional')
                                setIsMoved(false)
                            }}><i className="fa-solid fa-calendar-week"></i> Recibir citas</button>
                        </div>                        
                        
                        
                    </div>

                </div>


                {accountType === 'client' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='clientForm' className={styles['register-client-form']} onSubmit={handleSubmitClient}>

                        <label className={styles['register-label']}>Usuario</label>
                        <span className={`${!errors[0] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[0]}</span>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'></input>

                        <label className={styles['register-label']}>Contraseña</label>
                        <span className={`${!errors[1] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[1]}</span>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'></input>

                        <label className={styles['register-label']}>Re-ingrese contraseña</label>
                        <span className={`${!errors[1] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[1]}</span>

                        <input className={styles['register-input']} type='password' ref={confirmPasswordRef} placeholder='Re-ingrese su contraseña'></input>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='clientForm'><i className="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

                 {accountType === 'professional' ? 
                <div className={styles['contenedor-de-formas']}>
                    <form id='professionalForm' className={styles['register-professional-form']} onSubmit={handleSubmitPro}>
                        <label className={styles['register-label']}>Nombre completo</label>
                        <input className={styles['register-input']} type='text' ref={nameRef} placeholder='Ingrese su nombre completo'/>

                        <label className={styles['register-label']}>Numero telefonico</label>
                        <input className={styles['register-input']} type='text' ref={phoneRef} placeholder='Ingrese su numero telefonico'/>

                        <label className={styles['register-label']}>Correo</label>
                        <input className={styles['register-input']} type='text' ref={emailRef} placeholder='Ingrese su correo electronico'/>

                        <label className={styles['register-label']}>Usuario</label>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'/>

                        <label className={styles['register-label']}>Contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'/>

                        <label className={styles['register-label']}>Reingrese contraseña</label>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Reingrese su contraseña'/>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='professionalForm'><i className="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

            </div>
        
		</>
	)
}

export default Register
