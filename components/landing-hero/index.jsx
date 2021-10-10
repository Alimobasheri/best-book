import styles from "./index.module.css";

export default function LandingHero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.right}>
        <h1 className={`${styles.rightHeadline} bb-typography__header`}>
          تازه و پرمخاطب
        </h1>
        <p className={`${styles.rightSubline} bb-typography__body`}>
          آثار نوین را کشف کنید.
        </p>
      </div>
    </div>
  );
}
