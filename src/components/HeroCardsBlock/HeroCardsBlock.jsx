// components/HeroCardBlock/HeroCardBlock.tsx

import Image from "next/image";
import styles from "./HeroCardsBlock.module.css";

const CARDS = [1, 2, 3, 4, 5, 6];

export default function HeroCardBlock() {
  return (
    <div className={styles.heroCardBlock}>
      {CARDS.map((card) => (
        <Image
          key={card}
          src={`/card${card}.png`}
          alt=""
          width={224}
          height={344}
          className={`${styles.heroCard} ${styles[`card${card}`]}`}
        />
      ))}
    </div>
  );
}