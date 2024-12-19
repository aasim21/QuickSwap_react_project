import styles from "./Hero.module.css";
import image from "../../assets/Untitled design_20241214_145702_0000.png";

const Hero = () =>{
    return(
        <div className={styles.main_container}>
            <div className={styles.child_container}>
                <div className={styles.child_container_info}>
                    <div className= {styles.child_container_info_description}>
                    <h1>WELCOME TO</h1>
                    <p className={styles.logo}><span>Qu</span>ickSwap</p>
                    
                    <p className={styles.hero_description}>This website is genrated by React<br /> and used for selling old items.</p>
                    </div>
                </div>
                <div className={styles.child_container_img_container} style = {{backgroundImage: `url(${image})`}}>
                </div>
            </div>

        </div>
    )
}

export default Hero;