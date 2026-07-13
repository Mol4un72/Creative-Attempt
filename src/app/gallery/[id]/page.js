import Card from "../../../components/Card/Card";
import Link from "next/link";
import styles from "./page.module.css";
import { supabase } from "../../../lib/supabase";


export async function generateMetadata({ params }) {
  const { id } = await params;

  const { data: art } = await supabase
    .from("arts")
    .select("name")
    .eq("id", id)
    .single();


  return {
    title: art ? art.name : "Artwork not found",
  };
}


export default async function CardPage({ params }) {
  const { id } = await params;


  const { data, error } = await supabase
    .from("arts")
    .select("*")
    .eq("id", id)
    .single();


  if (error || !data) {
    return (
      <div className={styles.page}>
        <main className={styles.notFound}>
          <span className={styles.notFoundIcon}>
            😕
          </span>

          <h1 className={styles.notFoundTitle}>
            Artwork not found
          </h1>

          <p className={styles.notFoundSub}>
            The artwork you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>

          <Link
            href="/gallery"
            className={styles.backLink}
          >
            ← Back to Gallery
          </Link>
        </main>
      </div>
    );
  }


  const art = {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image_url,
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <Link
          href="/gallery"
          className={styles.backLink}
        >
          ← Back to Gallery
        </Link>


        <Card
          variant="full"
          art={art}
        />

      </main>
    </div>
  );
}