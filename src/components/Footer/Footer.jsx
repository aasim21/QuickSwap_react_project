import styles from "./Footer.module.css";
import olaLogo from "./olx.png";
import bikewaleLogo from "./bikewale.png";
import carwaleLogo from "./carwale.png";
const Footer = () => {
    return(
       <div className={styles.main_container}>
        <img src = {olaLogo} style ={{width:"3rem",height:"3rem"}} />
        <img src = {bikewaleLogo} style ={{width:"5rem",height:"5rem"}}/>
        <img src = {carwaleLogo} style ={{width:"5rem",height:"5rem"}}/>
       </div>
    )
}

export default Footer;