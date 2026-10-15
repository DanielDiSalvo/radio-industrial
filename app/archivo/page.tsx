"use client";

import { useState } from "react";
import Header from "../components/Header";
import AudioConsole from "../components/AudioConsole";
import { useRadio } from "../components/RadioProvider";

const episodes = [
  {
    id: "pulso-ebm",
    title: "Pulso EBM",
    genres: ["EBM"],
    description:
      "Ritmos, máquinas y la energía de la pista. EBM clásico y contemporáneo.",
    duration: "58:24",
  },
  {
    id: "maquinas-y-ruido",
    title: "Máquinas y ruido",
    genres: ["Industrial", "Noise"],
    description:
      "Exploraciones sonoras entre el industrial, el noise y sus raíces.",
    duration: "1:12:08",
  },
  {
    id: "archivo-oscuro",
    title: "Archivo oscuro",
    genres: ["Dark electro", "Electro-industrial"],
    description:
      "Joyas, rarezas y material de la escena. Pasado y presente del underground.",
    duration: "1:04:17",
  },
  {
    id: "frecuencias-rotas",
    title: "Frecuencias rotas",
    genres: ["Power electronics", "Noise"],
    description:
      "Distorsión, tensión y experimentación. Un recorrido por los sonidos extremos.",
    duration: "1:03:56",
  },
  {
    id: "ecos-de-la-fabrica",
    title: "Ecos de la fábrica",
    genres: ["Martial industrial", "Industrial"],
    description:
      "Percusión, atmósferas y memoria industrial. La máquina como inspiración.",
    duration: "1:18:33",
  },
  {
    id: "senales-nocturnas",
    title: "Señales nocturnas",
    genres: ["Experimental", "Underground"],
    description:
      "Paisajes sonoros, ritmos hipnóticos y descubrimientos para la noche.",
    duration: "59:11",
  },
];

const filters = [
  "Todos",
  ...new Set(episodes.flatMap((episode) => episode.genres)),
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ArchivePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const { isPlaying, volume, startListening, togglePlayback, setVolume } =
    useRadio();

  const query = normalize(search);

  const filteredEpisodes = episodes.filter((episode) => {
    const matchesGenre =
      selectedGenre === "Todos" || episode.genres.includes(selectedGenre);

    const searchableText = normalize(
      [episode.title, episode.description, ...episode.genres].join(" "),
    );

    return matchesGenre && searchableText.includes(query);
  });

  function clearFilters() {
    setSearch("");
    setSelectedGenre("Todos");
  }

  return (
    <>
      <Header activePath="/archivo" onListen={startListening} />

      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[url('/images/hero-industrial.png')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Buenos Aires / Radio online / Archivo sonoro
            </p>

            <h1 className="mt-5 font-display text-5xl font-bold uppercase sm:text-7xl lg:text-8xl">
              Archivo sonoro
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-5 font-mono text-xs uppercase leading-6 tracking-widest">
              Volvé a explorar nuestras emisiones.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-wider text-muted">
            Catálogo de ejemplo · Audios pendientes
          </p>

          <div className="max-w-xl">
            <label
              htmlFor="episode-search"
              className="mb-3 block font-mono text-xs uppercase tracking-wider"
            >
              Buscar episodio
            </label>

            <input
              id="episode-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Título, estilo o descripción…"
              className="min-h-12 w-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">
              Filtrar por estilo
            </legend>

            <div className="flex flex-wrap gap-2">
              {filters.map((genre) => {
                const isSelected = selectedGenre === genre;

                return (
                  <button
                    key={genre}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedGenre(genre)}
                    className={`min-h-11 border px-4 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-surface text-muted hover:border-accent hover:text-foreground"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p
            role="status"
            className="my-6 font-mono text-[10px] uppercase tracking-wider text-muted"
          >
            {filteredEpisodes.length === 1
              ? "1 episodio encontrado"
              : `${filteredEpisodes.length} episodios encontrados`}
          </p>

          {filteredEpisodes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredEpisodes.map((episode) => {
                const number = String(
                  episodes.findIndex((item) => item.id === episode.id) + 1,
                ).padStart(2, "0");

                return (
                  <article
                    key={episode.id}
                    id={episode.id}
                    className="min-w-0 scroll-mt-6 border border-border bg-surface/40 p-5 transition-colors target:border-accent hover:border-muted"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase leading-5 tracking-wider text-accent">
                        {episode.genres.join(" / ")}
                      </p>

                      <span className="shrink-0 font-mono text-[10px] text-muted">
                        EP. {number}
                      </span>
                    </div>

                    <div
                      aria-hidden="true"
                      className="relative mt-5 flex h-36 items-end overflow-hidden border border-border bg-[linear-gradient(135deg,#373b3b,#090a0a_70%)] p-4"
                    >
                      <span className="font-display text-6xl font-bold text-white/30">
                        {number}
                      </span>
                      <span className="absolute inset-y-0 right-0 w-3 bg-accent" />
                    </div>

                    <h2 className="mt-5 font-display text-3xl font-semibold">
                      {episode.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {episode.description}
                    </p>

                    <details className="mt-5 border-t border-border pt-4">
                      <summary className="min-h-11 cursor-pointer font-mono text-[10px] uppercase leading-6 tracking-wider hover:text-accent">
                        Ficha del episodio
                      </summary>

                      <dl className="space-y-3 pb-2 text-xs">
                        <div>
                          <dt className="text-muted">Duración</dt>
                          <dd className="mt-1 font-mono">{episode.duration}</dd>
                        </div>

                        <div>
                          <dt className="text-muted">Disponibilidad</dt>
                          <dd className="mt-1">
                            Audio pendiente de publicación.
                          </dd>
                        </div>
                      </dl>
                    </details>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-border bg-surface/40 px-5 py-14 text-center">
              <h2 className="font-display text-3xl font-semibold">
                No encontramos episodios
              </h2>

              <p className="mt-3 text-sm text-muted">
                Probá otro término o cambiá el estilo seleccionado.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 min-h-12 border border-accent px-6 font-mono text-xs uppercase text-accent hover:bg-accent hover:text-white"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        <AudioConsole
          isPlaying={isPlaying}
          volume={volume}
          onTogglePlayback={togglePlayback}
          onVolumeChange={setVolume}
        />
      </main>
    </>
  );
}
