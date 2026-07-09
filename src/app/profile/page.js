import style from './page.module.css';
import Card from '../../components/Card/Card';
import Link from 'next/link';
import { arts } from '../../data/arts';
import { users } from '../../data/users';
import { achievements } from '../../data/achievements';

export const metadata = {
  title: 'Profile',
};

const RARITY_CLASS = {
  common: style.common,
  uncommon: style.uncommon,
  rare: style.rare,
  legendary: style.legendary,
};

const userID = 0

const achievementsItem = users[userID].achievements.map((achievementId) => achievements.find((achievement) => achievement.id === achievementId)).filter(Boolean);
const artsItem = users[userID].arts.map((artId) => arts.find((art) => art.id === artId)).filter(Boolean);

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
              <h1 className={style.nickname}>{users[userID].name}</h1>
              <Link href="/profile/settings-page" className={style.settingsBtn} aria-label="Profile settings">
                <img src="/settings.svg" alt="" width={22} height={22} />
              </Link>
            </div>
            <p className={style.profileStats}>
              <span>
                <strong>{artsItem.length}</strong> artworks
              </span>
            </p>
          </div>

          <ul className={style.achievements} aria-label="Achievements">
            {achievementsItem.map((achievement, index) => (
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
            {artsItem.filter((art) => art.image).map((art) => (
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