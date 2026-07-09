import Card from "../../../components/Card/Card";
import Link from "next/link";
import styles from "./page.module.css";
import { arts } from "../../../data/arts";

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
      <main className={styles.main}>
        <Link href="/gallery" className={styles.backLink}>
          ← Back to Gallery
        </Link>
        <Card variant="full" art={art} />
      </main>
    </div>
  );
}