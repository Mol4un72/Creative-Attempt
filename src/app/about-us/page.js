import style from './page.module.css';
import Header from '../../components/Header/Header';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Creative Attempt and its creator.',
};

export default function AboutUsPage() {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.card}>
          <span className={style.eyebrow}>Our story</span>
          <h1 className={style.title}>About Us</h1>
          <p className={style.body}>
            <strong>Mol4un</strong> is a solo beginner web developer who created this site as a portfolio project and a fun experiment in building a meme collecting platform. 🙂
          </p>
          <p className={style.body}>
            Creative Attempt is built with Next.js, React and a lot of curiosity. If you want to follow the journey, check out the GitHub repository.
          </p>
        </div>
      </main>
    </div>
  );
}