import styles from './Register.module.css';
import { useRef, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


function Register() {

    const [accountType, setAccountType] = useState('');
    const [isMoved, setIsMoved] = useState(true);
    const [errors, setErrors] = useState(['', '', '', '', '']);

    const [phone,setPhone] = useState(null);

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


        setErrors(['', '', '', '', '']);

        
        const username = userRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        const ClientData = {
            role: 'client',
            username,
            password,
            confirmPassword     
        }

        if(!username || username.length < 3 || username.length > 16) {
            setErrorAtIndex(0, 'El usuario es obligatorio y tiene que ser de 3 a 16 caracteres')
        }
        if( !password || !confirmPassword || password !== confirmPassword) {
            setErrorAtIndex(1, "Las contraseñas son obligatorias y deben coincidir")
            return;
        }

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(ClientData)
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


    setErrors(['', '', '', '', '']);
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const username = userRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const parsedPhone = parsePhoneNumberFromString(`+${phone}`);

    if (!name || name.length < 3 || name.length > 25) {
        setErrorAtIndex(0, 'El nombre debe tener entre 3 y 25 caracteres');
    }

    if (!parsedPhone || !parsedPhone.isValid()) {
        setErrorAtIndex(1, 'Ingrese un número telefónico válido');
    }

    if (!email || !emailRegex.test(email)) {
        setErrorAtIndex(2, 'Ingrese un correo válido');
    }

    if (!username || username.length < 3 || username.length > 16) {
        setErrorAtIndex(3, 'El usuario debe tener entre 3 y 16 caracteres');
    }

    if (!password || !confirmPassword || password !== confirmPassword) {
        setErrorAtIndex(4, 'Las contraseñas deben coincidir');
        return;
    }

    const ProData = {
        role: 'pro',
        name,
        phone: parsedPhone.number,
        email,
        username,
        password,
        confirmPassword,
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ProData),
    })
        .then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
            throw data; 
            });
        } else {
            return res.json();
        }
        })
        .then((data) => {
        console.log('Server response:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        setErrors(['Error al registrar el profesional']);
        });
    };


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
                        <span className={`${!errors[0] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[0]}</span>
                        <input className={styles['register-input']} type='text' ref={nameRef} placeholder='Ingrese su nombre completo'/>

                        <span className={`${!errors[1] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[1]}</span>
                        <label className={styles['register-label']}>Numero telefonico</label>
                        <PhoneInput
                        country={'mx'}              
                        value={phone}
                        onChange={setPhone}
                        enableSearch={true}       
                        placeholder="Ingrese su numero telefonico"
                        searchPlaceholder='Buscar'
                        inputStyle={{ width: '100%' }}/>

                        <label className={styles['register-label']}>Correo Electronico</label>
                        <span className={`${!errors[2] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[2]}</span>
                        <input className={styles['register-input']} type='text' ref={emailRef} placeholder='Ingrese su correo electronico'/>

                        <label className={styles['register-label']}>Usuario</label>
                        <span className={`${!errors[3] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[3]}</span>
                        <input className={styles['register-input']} type='text' ref={userRef} placeholder='Ingrese el usuario que desea tener'/>

                        <label className={styles['register-label']}>Contraseña</label>
                        <span className={`${!errors[4] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[4]}</span>
                        <input className={styles['register-input']} type='password' ref={passwordRef} placeholder='Ingrese su contraseña'/>

                        <label className={styles['register-label']}>Reingrese contraseña</label>
                        <span className={`${!errors[4] ? styles['register-errors-message-inactive'] : styles['register-errors-message-active']}`}>{errors[4]}</span>
                        <input className={styles['register-input']} type='password' ref={confirmPasswordRef} placeholder='Reingrese su contraseña'/>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='professionalForm'><i className="fa-solid fa-paper-plane"></i> Registrar</button>
                    
                </div>
                 : <div></div>}

            </div>
        
		</>
	)
}

export default Register
