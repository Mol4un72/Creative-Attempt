import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

/** Footer navigation columns */
const COLUMNS = [
  {
    heading: "Gallery",
    links: [
      { label: "Browse All", href: "/gallery" },
      { label: "Category 1", href: "/" },
      { label: "Category 2", href: "/" },
      { label: "Category 3", href: "/" },
    ],
  },
  {
    heading: "Create",
    links: [
      { label: "Upload Artwork", href: "/create" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",    href: "/about-us" },
      { label: "Contact",     href: "/contact-us" },
    ],
  },
];


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <Link href="/" aria-label="Creative Attempt home">
            <Image src="/logo.png" alt="Creative Attempt" width={160} height={56} />
          </Link>
          <p className={styles.tagline}>
            A meme collecting platform where creativity meets community.
          </p>
        </div>

        {/* Nav Columns */}
        <nav className={styles.columns} aria-label="Footer navigation">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className={styles.column}>
              <h3 className={styles.columnHeading}>{heading}</h3>
              <ul className={styles.linkList}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={styles.link}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year} Creative Attempt. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link href="/" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/" className={styles.legalLink}>Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}