"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { addPlant, getPlants, removePlant, updatePlant } from "../../library/storage";
import type { Plant } from "../../library/types";


// Hjälpare: beräkna dagar till nästa vattning
function daysUntilNextWatering(p: Plant): number | null {
  if (!p.wateringIntervalDays || !p.lastWatered) return null;
  const last = new Date(p.lastWatered);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor((now.getTime() - last.getTime()) / msPerDay);
  return Math.max(p.wateringIntervalDays - daysSince, 0);
}

export default function HomeGroPage() {
  // Form state
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [interval, setInterval] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  // List state
  const [plants, setPlants] = useState<Plant[]>([]);

  // Ladda vid mount
  useEffect(() => {
    setPlants(getPlants());
  }, []);

  // Lägg till växt
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const newPlant: Plant = {
      id: crypto.randomUUID(),
      name: trimmed,
      imageData: imageUrl.trim() || undefined,
      wateringIntervalDays: typeof interval === "number" ? interval : undefined,
      notes: notes.trim() || undefined,
    };

    addPlant(newPlant);
    setPlants(getPlants());

    // töm formuläret
    setName("");
    setImageUrl("");
    setInterval("");
    setNotes("");
  }

  // Markera vattnad idag
  function markWatered(id: string) {
    const today = new Date().toISOString();
    updatePlant(id, { lastWatered: today });
    setPlants(getPlants());
  }

  // Ta bort växt
  function deletePlant(id: string) {
    removePlant(id);
    setPlants(getPlants());
  }

  // Sortera: närmast vattning först (valfritt, men nice)
  const sorted = useMemo(() => {
    return [...plants].sort((a, b) => {
      const da = daysUntilNextWatering(a);
      const db = daysUntilNextWatering(b);
      // null sist
      if (da === null && db === null) return 0;
      if (da === null) return 1;
      if (db === null) return -1;
      return da - db;
    });
  }, [plants]);

  return (
    <main className={styles.wrap}>
      <h1 className={styles.title}>Mina växter 🌿</h1>
      <p className={styles.lead}>
        Lägg till en växt med valfri bild, vattningsintervall och anteckningar. Sidan är under utveckling och allt sparas i din webbläsare idagsläget.
      </p>

      {/* Formulär */}
      <form className={styles.form} onSubmit={handleAdd}>
        <div className={`${styles.row} ${styles.row3}`}>
          <div>
            <label className={styles.label}>Växtsort</label>
            <input
              className={styles.input}
              placeholder="Monstera deliciosa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Hur ofta ska växten vattnas? (dagar)</label>
            <input
              className={styles.number}
              type="number"
              min={1}
              placeholder="7"
              value={interval}
              onChange={(e) => {
                const v = e.target.value;
                setInterval(v === "" ? "" : Number(v));
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label className={styles.label}>Anteckningar (valfritt)</label>
            <textarea
              className={styles.textarea}
              placeholder="Ljust läge, undvik direkt sol…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>
            Lägg till växt
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.secondary}`}
            onClick={() => {
              setName("");
              setImageUrl("");
              setInterval("");
              setNotes("");
            }}
          >
            Rensa formulär
          </button>
        </div>
      </form>

      {/* Lista */}
      <section className={styles.list} aria-live="polite">
        {sorted.length === 0 ? (
          <p>Du har inga växter än. Lägg till din första här ovan! 🌱</p>
        ) : (
          sorted.map((p) => {
            const days = daysUntilNextWatering(p);
            return (
              <article key={p.id} className={styles.card}>
                {/* Bild */}
                {p.imageData ? (
                  <Image
                    src={p.imageData}
                    alt={p.name}
                    width={96}
                    height={96}
                    className={styles.thumb}
                    unoptimized
                  />
                ) : (
                  <div className={styles.thumb} aria-hidden />
                )}

                {/* Info */}
                <div className={styles.info}>
                  <h3>
                    {p.name}
                    {typeof p.wateringIntervalDays === "number" && (
                      <span className={styles.badge}>
                        var {p.wateringIntervalDays} dag
                        {p.wateringIntervalDays === 1 ? "" : "ar"}
                      </span>
                    )}
                  </h3>
                  <p className={styles.meta}>
                    {p.lastWatered
                      ? `Senast vattnad: ${new Date(p.lastWatered).toLocaleDateString("sv-SE")}`
                      : "Ingen vattningsdata ännu"}
                    {days !== null && ` • ${days} dagar kvar`}
                  </p>
                  {p.notes && <p className={styles.meta}>📝 {p.notes}</p>}
                </div>

                {/* Actions */}
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.btn} ${styles.small} ${styles.primary}`}
                    onClick={() => markWatered(p.id)}
                  >
                    Vattnad idag
                  </button>
                  <button
                    className={`${styles.btn} ${styles.small} ${styles.danger}`}
                    onClick={() => deletePlant(p.id)}
                    aria-label={`Ta bort ${p.name}`}
                    title="Ta bort växt"
                  >
                    Ta bort
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
