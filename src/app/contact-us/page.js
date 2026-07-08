import style from './page.module.css';
import Form from '../../components/Form/Form';

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

          <div className={style.form}>
            <Form initialMode="contact" />
          </div>
        </section>
      </main>
    </div>
  );
}