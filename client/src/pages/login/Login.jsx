import styles from './Login.module.css'

function Login(){

    return(
        <>

        <div className={styles['contenedor-de-hoja']}>
            <h1 className={styles['titulo']}>Iniciar Sesion</h1>
            <div className={styles['contenedor-de-login-y-boton']}>
                <div className={styles['contenedor-de-login']}>
                    <form id='iniciar-sesion-forma' className={styles['iniciar-sesion-forma']}>

                        <label className={styles['label']}>Usuario</label>
                        <input className={styles['input']} type='text' placeholder='Ingrese el usuario que desea tener'></input>


                        <label className={styles['label']}>Contraseña</label>
                        <input className={styles['input']} type='password' placeholder='Ingrese su contraseña'></input>

                    </form>

                    <button className={styles['submit-boton']} type='submit' form='iniciar-sesion-forma'>Iniciar Sesion</button>
                    
            </div>
            </div>
            
            
        </div>
        
        
        
        </>
    );
}

export default Login