import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <span className={styles.badge}>Skapa din växtsamling hos Gro!🌻</span>
        <h1 className={styles.title}>Välkommen till Gro 🌱</h1>
        <p className={styles.lead}>
          Din digitala växtvän – samla dina blommor och växter, få tips om vattning,
          omplantering och skötsel.
        </p>

        <div className={styles.ctaRow}>
          <a href="/my-plants" className={styles.btnPrimary}>
            Mina växter
          </a>
          <a href="/explore" className={styles.btnSecondary}>
            Utforska växter
          </a>
        </div>
      </div>

      {/* Feature-kort */}
      <div className={styles.grid}>
        <article className={styles.cardPeach}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>📒 Mina växter</h3>
            <p className={styles.cardText}>
              Lägg till växter med bild, namn och skötseltips. Allt samlat på ett ställe.
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
              Anteckna jordtyp, krukstorlek och säsongens åtgärder.
            </p>
          </div>
        </article>

        <article className={styles.cardGreenLight}>
          <div className={styles.cardInner}>
            <h3 className={styles.cardTitle}>🔎 Utforska</h3>
            <p className={styles.cardText}>
              Inspireras av andra växter och hitta nybörjarvänliga favoriter.
            </p>
          </div>
        </article>
      </div>

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
