import style from './page.module.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Textarea from '../../components/Textarea/Textarea';

export const metadata = {
  title: 'Contact Us',
  description: "Send us a message — we'd love to hear from you.",
};

export default function ContactUsPage() {
  return (
    <div className={style.page}>
      <main className={style.main}>
        <aside className={style.aside} aria-hidden="true">
          <img src="/contact_us_1.png" alt="" className={style.asideImg} />
          <img src="/contact_us_2.png" alt="" className={style.asideImg} />
        </aside>

        <section className={style.formPanel} aria-label="Contact form">
          <span className={style.eyebrow}>Get in touch</span>
          <h1 className={style.title}>Contact Us</h1>
          <p className={style.sub}>Have a question, suggestion or want to collaborate? We&apos;d love to hear from you.</p>

          <form className={style.form} noValidate>
            <Input id="contact-name" placeholder="Your name" label="Name" />
            <Input id="contact-email" placeholder="you@example.com" label="Email" type="email" autoComplete="email" />
            <Textarea id="contact-msg" placeholder="Tell us what's on your mind…" label="Message" rows={5} />
            <Button type="submit" size="lg" style={{ width: '100%' }}>
              Send Message
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}