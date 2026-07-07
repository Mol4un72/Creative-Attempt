import Header from "../../../components/Header/Header";
import Card from "../../../components/Card/Card";
import Link from "next/link";
import styles from "./page.module.css";

/* Shared arts data */
const arts = [
  { id: 1,  name: "Gigachad",     price: 1000, endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 2,  name: "Pepe",         price: 500,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 3,  name: "Doge",         price: 750,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 4,  name: "Wojak",        price: 200,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 5,  name: "Nyan Cat",     price: 300,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 6,  name: "Shiba",        price: 900,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 7,  name: "Trollface",    price: 150,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 8,  name: "Rickroll",     price: 420,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 9,  name: "Drakeposting", price: 600,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 10, name: "Grumpy Cat",   price: 850,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 11, name: "Distracted",   price: 350,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
  { id: 12, name: "Success Kid",  price: 450,  endsAt: "2026-07-05T18:30:00.000Z", image: "/img.png" },
];

/* 🔥 REQUIRED for static export */
export function generateStaticParams() {
  return arts.map((art) => ({
    id: art.id.toString(),
  }));
}

/* Metadata */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const art = arts.find((a) => a.id.toString() === id);

  return {
    title: art ? art.name : "Artwork not found",
  };
}

export default async function CardPage({ params }) {
  const { id } = await params;

  const art = arts.find((a) => a.id.toString() === id);

  if (!art) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.notFound}>
          <span className={styles.notFoundIcon}>😕</span>
          <h1 className={styles.notFoundTitle}>Artwork not found</h1>
          <p className={styles.notFoundSub}>
            The artwork you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/gallery" className={styles.backLink}>
            ← Back to Gallery
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Link href="/gallery" className={styles.backLink}>
          ← Back to Gallery
        </Link>
        <Card variant="full" art={art} />
      </main>
    </div>
  );
}