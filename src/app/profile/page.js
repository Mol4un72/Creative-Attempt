import style from './page.module.css';
import Card from '../../components/Card/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Profile',
};

const arts = [
  { id: 1, name: 'Gigachad', price: 1000, time: 1000, image: '/img.png' },
  { id: 2, name: 'Pepe', price: 500, time: 800, image: '/img.png' },
  { id: 3, name: 'Doge', price: 750, time: 600, image: '/img.png' },
  { id: 4, name: 'Wojak', price: 200, time: 1200, image: '/img.png' },
  { id: 5, name: 'Nyan Cat', price: 300, time: 400, image: '/img.png' },
  { id: 6, name: 'Shiba', price: 900, time: 900, image: '/img.png' },
  { id: 7, name: 'Trollface', price: 150, time: 300, image: '/img.png' },
  { id: 8, name: 'Gigachad', price: 1000, time: 1000, image: '/img.png' },
  { id: 9, name: 'Pepe', price: 500, time: 800, image: '/img.png' },
  { id: 10, name: 'Doge', price: 750, time: 600, image: '/img.png' },
  { id: 11, name: 'Wojak', price: 200, time: 1200, image: '/img.png' },
  { id: 12, name: 'Nyan Cat', price: 300, time: 400, image: '/img.png' },
  { id: 13, name: 'Shiba', price: 900, time: 900, image: '/img.png' },
  { id: 14, name: 'Trollface', price: 150, time: 300, image: '/img.png' },
  { id: 15, name: 'Gigachad', price: 1000, time: 1000, image: '/img.png' },
  { id: 16, name: 'Pepe', price: 500, time: 800, image: '/img.png' },
  { id: 17, name: 'Doge', price: 750, time: 600, image: '/img.png' },
  { id: 18, name: 'Wojak', price: 200, time: 1200, image: '/img.png' },
  { id: 19, name: 'Nyan Cat', price: 300, time: 400, image: '/img.png' },
  { id: 20, name: 'Shiba', price: 900, time: 900, image: '/img.png' },
  { id: 21, name: 'Trollface', price: 150, time: 300, image: '/img.png' },
];

const achievements = [
  { name: 'First Upload', rarity: 'common' },
  { name: 'Top Seller', rarity: 'rare' },
  { name: 'First Bid', rarity: 'uncommon' },
  { name: 'Pioneer', rarity: 'legendary' },
  { name: '100 Likes', rarity: 'rare' },
];

const RARITY_CLASS = {
  common: style.common,
  uncommon: style.uncommon,
  rare: style.rare,
  legendary: style.legendary,
};

export default function ProfilePage() {
  return (
    <div className={style.page}>

      <main>
        <section className={style.profileBanner} aria-label="User profile">
          <div className={style.avatarWrap}>
            <div className={style.avatar} aria-label="User avatar" />
          </div>

          <div className={style.profileInfo}>
            <div className={style.nicknameRow}>
              <h1 className={style.nickname}>Nickname</h1>
              <Link href="/profile/settings-page" className={style.settingsBtn} aria-label="Profile settings">
                <img src="/settings.svg" alt="" width={22} height={22} />
              </Link>
            </div>
            <p className={style.profileStats}>
              <span>
                <strong>{arts.length}</strong> artworks
              </span>
            </p>
          </div>

          <ul className={style.achievements} aria-label="Achievements">
            {achievements.map((achievement, index) => (
              <li key={index} className={style.achievementItem} title={`${achievement.name} — ${achievement.rarity}`}>
                <div className={`${style.achievement} ${RARITY_CLASS[achievement.rarity] || ''}`}>
                  <img />
                </div>
                <span className={style.achievementName}>{achievement.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={style.artSection} aria-label="User artworks">
          <h2 className={style.sectionTitle}>Collection</h2>
          <div className={style.cards}>
            {arts.filter((art) => art.image).map((art) => (
              <Link key={`${art.id}-${art.name}`} href={`/gallery/${art.id}`}>
                <Card art={art} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}