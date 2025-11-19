import styles from '../footer/Footer.module.css'
import Logo from '../../assets/logo-transparente.png'


function Footer(){
    return(
        <>
            <div className={styles["footer-section"]}>
                <div className={styles["logo-contact"]}>
                    <div className={styles["logo-section"]}>
                        <img src={Logo} alt="Logo" /> 
                        <div className={styles["address-text"]}>
                            <ul>
                                <li><i className={styles["fa-solid fa-map-location-dot"]}></i>  Tijuana, Baja California, México</li>
                                <li><i className={styles["fa-solid fa-phone"]}></i> Phone: 6641764482</li>
                                <li><i className={styles["fa-solid fa-envelope"]}></i> Mail: citaya@outlook.com</li>
                            </ul>
                        </div>
                    </div>

                </div>



                    <div className={styles["support-section"]}>
                        <div className={styles["support-section-title"]}>
                        <h2>Support</h2>
                        </div>
                        <div className={styles["support-section-list"]}>
                            <ul>
                                <li> Contact</li>
                                <li> FAQ's</li>
                                <li> Sitemap</li>                
                            </ul>
                        </div>
                    </div>

                    <div className={styles["links-section"]}>
                        <div className={styles["links-title"]}>
                        <h2>Quick Links</h2>
                        </div>
                        <div className={styles["links-list"]}>
                            <ul>
                                <li> Videos</li>
                                <li> Tutorials</li>
                                <li> Gallery</li>                
                            </ul>
                        </div>
                    </div>

                    <div className={styles["socials-section"]}>
                        <div className={styles["links-title"]}>
                        <h2>Socials</h2>
                        </div>
                        <div className={styles["socials-list"]}>
                            <ul>
                                <li><i class="fa-brands fa-instagram"></i> Instagram</li>
                                <li><i class="fa-brands fa-facebook"></i> Facebook</li>
                                <li><i class="fa-brands fa-x-twitter"></i> X</li>                
                            </ul>
                        </div>
                    </div>


            </div>
            
        </>
    )
}

export default Footer;


