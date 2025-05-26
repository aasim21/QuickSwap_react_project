import styles from "./Hero.module.css";
import image from "../../assets/Untitled design_20241214_145702_0000.png";

const Hero = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.child_container}>
        <div className={styles.child_container_info}>
          <h1>WELCOME TO</h1>
          <p className={styles.logo}>
            <span>Qu</span>ickSwap
          </p>
          <p className={styles.hero_description}>
            This website is genrated by React
            <br /> and used for selling old items.
            <br />
          </p>
        </div>
        <div className={styles.child_container_img_container}>
          <img className={styles.img} src={image} />
          <p className={styles.author}>© Asim Saeed, Qu — 2022–2026</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
