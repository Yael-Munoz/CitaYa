import styles from './ProDashboard.module.css';



function ProDashboard() {



    return(
        <>

        <div className={styles['pro-dash-fondo']}>

            <div className={styles['pro-dash-contenedor-de-pagina-completa']}>

                <div className={styles['pro-dash-contenedor-de-secciones']}>

                    <div className={styles['pro-dash-contenedor1']}>
                        <div className={styles['pro-dash-contenedor1-contenedor-de-foto']}>
                            <div className={styles['pro-dash-contenedor1-foto']}></div>
                            <p className={styles['pro-dash-contenedor1-texto-nombre']}>Nombres y Apellidos</p>

                        </div>
                        <div className={styles['pro-dash-contenedor1-texto-informacion']}>
                            <p>Profesion: </p>
                            <p>Ubicacion: </p>
                            <p>Descripcion: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nisi iure dolorum soluta, ab</p>
                            <p>Correo: </p>
                            <p>Telefono: xxx-xxx-xxx</p>
                            <p>Redes Sociales: </p>
                        </div>  
                                                  
                            <button className={styles['pro-dash-contenedor1-boton-de-editar']}>Editar</button>
                        

                    </div>
                    <div className={styles['pro-dash-contenedor2']}>

                    </div>
                    <div className={styles['pro-dash-contenedor3']}>

                    </div>

                </div>

            </div>

        </div>
        
        
        
        </>
    );
}

export default ProDashboard;