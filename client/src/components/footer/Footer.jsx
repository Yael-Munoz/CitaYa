import styles from '../footer/Footer.module.css'
import Logo from '../../assets/logo-transparente.png'


function Footer(){
    return(
        <>
            <div className={styles["footer-section"]}>
                <div className={styles["logo-contact"]}>
                    <div className={styles["logo-section"]}>
                        <img src={Logo} alt="Logo" /> 
                        <div className={["address-text"]}>
                            <ul>
                                <li>Tijuana, Baja California, México</li>
                                <li>Phone: 6641764482</li>
                                <li>Mail: citaya@outlook.com</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Footer;


