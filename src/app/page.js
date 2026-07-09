import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import HeroCardsBlock from '../components/HeroCardsBlock/HeroCardsBlock';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Creative Attempt — Meme Collecting Platform',
  description: 'A place to display your creativity. Post, collect and sell your artwork on Creative Attempt.',
};

const HOW_IT_WORKS = [
  { src: '/phone_1.png', alt: 'Upload your artwork', step: '01', label: 'Upload' },
  { src: '/phone_2.png', alt: 'Name and price it', step: '02', label: 'Name' },
  { src: '/phone_3.png', alt: 'Sell your creation', step: '03', label: 'Sell!' },
];

export default function Home() {
  return (
    <div className={styles.page}>

      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${styles.heroTitle_1}`}>Creative</h1>
          <h1 className={`${styles.heroTitle} ${styles.heroTitle_2}`}>Attempt</h1>

          <div className={styles.heroActions}>
            <Link href="/gallery">
              <Button size="lg">Browse Gallery</Button>
            </Link>
            <Link href="#learn-more">
              <Button size="lg" variant="secondary">Learn More</Button>
            </Link>
          </div>
        </div>

        <div className={styles.heroCardBlock}>
          <HeroCardsBlock />
        </div>
      </main>

      <section className={styles.learnMore} id="learn-more">
        <div className={styles.learnMoreContent}>
          <h2>Creative Attempt is...</h2>
          <p>
            Platform, where you can upload your image, set price and sell like this!
            <br />
            Also you can buy other users images. <Link href="#how-it-works">How it works?</Link>
          </p>
        </div>
      </section>

      <section>
        <div id="how-it-works" className={styles.steps} aria-label="How it works">
          <div className={styles.stepsHeader}>
            <h2 className={styles.stepsTitle}>Create, list and sell in three easy steps</h2>
          </div>

          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map(({ src, alt, step, label }) => (
              <article key={step} className={styles.step}>
                <div className={styles.stepImageWrap}>
                  <img src={src} alt={alt} className={styles.stepImage} />
                </div>
                <span className={styles.stepLabel}>{label}</span>
              </article>
            ))}
          </div>
          <div className={styles.stepsAction}>
            <Link href="/gallery">
              <Button size="lg">Browse Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
