"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

import { useRouter } from "next/navigation";
import styles from "./CreateCard.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function CreateCard({ image, blob }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    console.log("SUBMIT");

    if (!blob) {
      alert("Image not found");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const fileName = `${Date.now()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("arts-images")
      .upload(fileName, blob);

    if (uploadError) {
      console.log(uploadError);
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("arts-images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const { error } = await supabase.from("arts").insert({
      name,
      price: Number(price),
      image_url: imageUrl,
      creator_id: user.id,
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Artwork created!");
  }

  return (
    <section className={styles.card}>
      <div className={styles.imageContainer}>
        {image ? (
          <img
            src={image}
            alt="Artwork preview"
            className={styles.image}
          />
        ) : (
          <span>No image</span>
        )}
      </div>

      <div className={styles.fields}>
        <Input
          id="create-name"
          label="Name"
          placeholder="Artwork name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          id="create-price"
          label="Price ($)"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button
          size="lg"
          style={{ width: "100%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </section>
  );
}