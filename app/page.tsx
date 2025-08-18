"use client";


import styles from "./page.module.css";
import HomeGro from ".//homeGro/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import router from "next/router";
import Image from "next/image";



export default function HomePage() {
  const router = useRouter();

  const goToHomeGro = () => {
    router.push("/homeGro");
  };
  return (
    <section className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Välkommen till Gro 🌱</h1>
        <p className={styles.lead}>
          Din digitala växtvän – samla dina blommor och växter, få tips om vattning,
          omplantering och skötsel.
        </p>

        <div className={styles.ctaRow}>
          <button onClick={goToHomeGro} className={styles.btnPrimary}>
            Mina växter
            </button>
          <a href="/explore" className={styles.btnSecondary}>
            Utforska växter
          </a>
        </div>
      </div>

      {/* Feature-kort */}

         <article className={styles.infoInner}>
          <div className={styles.badge}>
            <span className={styles.cardTitle}>Vad kan du göra hos Gro?</span>
          </div>
        </article>

      <div className={styles.grid}>      
        <article className={styles.cardPeach}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>📒 Mina växter</h3>
            <p className={styles.cardText}>
              Lägg till dina växter med bild, namnge din växt och lägg till allmän info om din växt. Allt samlat på ett och samma ställe.
            </p>
          </div>
        </article>

        <article className={styles.cardGreenLight}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>💧 Vattningskoll</h3>
            <p className={styles.cardText}>
              Håll koll på senaste vattning och när det är dags igen.
            </p>
          </div>
        </article>

        <article className={styles.cardPeach}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>🪴 Omplantering</h3>
            <p className={styles.cardText}>
              Anteckna jordtyp, krukstorlek, säsongens åtgärder samt när du planterade om din växt senast.
            </p>
          </div>
        </article>

        <article className={styles.cardGreenLight}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>🔎🌿 Utforska</h3>
            <p className={styles.cardText}>
              Inspireras av andra växter och hitta nybörjarvänliga favoriter.
            </p>
          </div>
        </article>
      </div>

       <Image
        src="/my-plant.jpg"
        alt="En katt som planterar en växt samt är omringad av växter."
        width={300}
        height={200}
        className={styles.cardImage}/>

      {/* Info-rad */}
      <div className={styles.infoBar}>
        <div className={styles.infoInner}>
          <p>Byggd med Next.js &amp; TypeScript • Designad med CSS</p>
          <span className={styles.pill}>
            <span className={styles.dot} aria-hidden />
            Tillgänglighetsfokus
          </span>
        </div>
      </div>
    </section>
  );
}
