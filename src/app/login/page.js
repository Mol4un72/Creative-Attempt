
import Form from '../../components/Form/Form';
import styles from './page.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your Creative Attempt account.',
};

const SOCIAL_PROVIDERS = [
  { id: 'google', label: 'Continue with Google', icon: '/gmail_icon.svg' },
  { id: 'apple', label: 'Continue with Apple', icon: '/apple_icon.svg' },
];

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.card} aria-label="Sign in form">
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your account to continue.</p>

          <div className={styles.socials}>
            {SOCIAL_PROVIDERS.map(({ id, label, icon }) => (
              <button key={id} id={`login-${id}`} type="button" className={styles.socialBtn}>
                <Image src={icon} alt="" width={20} height={20} />
                {label}
              </button>
            ))}
          </div>

          <div className={styles.separator} role="separator" aria-label="or">
            <span className={styles.line} />
            <span className={styles.separatorText}>or</span>
            <span className={styles.line} />
          </div>

          <Form initialMode="login" />
        </section>
      </main>
    </div>
  );
}
