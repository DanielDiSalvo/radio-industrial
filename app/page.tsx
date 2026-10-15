"use client";

import Header from "./components/Header";
import AudioConsole from "./components/AudioConsole";
import FeaturedEpisodes from "./components/FeaturedEpisodes";
import { useRadio } from "./components/RadioProvider";

const genres = [
  "Industrial",
  "EBM",
  "Dark electro",
  "Electro-industrial",
  "Martial industrial",
  "Power electronics",
  "Noise",
  "Experimental",
  "Underground",
];

export default function Home() {
  const {
    isPlayerOpen,
    isPlaying,
    volume,
    setVolume,
    startListening,
    stopListening,
    togglePlayback,
  } = useRadio();

  return (
    <main className="min-h-screen">
      <Header onListen={startListening} />

      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[url('/images/hero-industrial.png')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-black/40 lg:bg-black/20" />
        </div>

        <div className="mx-auto grid min-h-140 max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.35fr_1fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Buenos Aires / Radio online / Desde el underground
            </p>

            <h1
              id="hero-title"
              className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[1.02] font-bold uppercase tracking-tight"
            >
              El sonido
              <br />
              del underground
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em]">
              Industrial / EBM / Dark electro
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Una señal independiente.
              <br />
              Música, historias y cultura de la escena oscura.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={isPlayerOpen ? stopListening : startListening}
                className="min-h-14 bg-accent px-7 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
              >
                {isPlayerOpen ? "■ Detener emisión" : "▶ Escuchar en vivo"}
              </button>

              <p className="border-l border-border pl-5 font-mono text-[10px] uppercase leading-5 tracking-widest text-muted">
                Más que música.
                <br />
                Una comunidad.
              </p>
            </div>
          </div>

          {isPlayerOpen && (
            <section
              aria-labelledby="player-title"
              className="w-full border border-border bg-background/95 p-5 shadow-2xl sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  ● Demo
                </span>

                <button
                  type="button"
                  onClick={stopListening}
                  aria-label="Cerrar reproductor y detener audio"
                  className="flex min-h-11 items-center gap-3 font-mono text-[10px] uppercase text-muted hover:text-foreground"
                >
                  Cerrar y detener
                  <span className="text-2xl" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>

              <h2
                id="player-title"
                className="mt-3 font-display text-3xl font-bold uppercase"
              >
                Sesión industrial
              </h2>

              <div className="mt-6 flex items-center gap-5">
                <div
                  aria-hidden="true"
                  className="flex size-24 shrink-0 items-center justify-center border border-border bg-surface font-display text-4xl text-accent"
                >
                  RI
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Ahora suena
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">
                    Suicide Commando
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Selección de la noche
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                <p
                  role="status"
                  className="font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {isPlaying ? "Reproducción simulada" : "En pausa"}
                </p>

                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pausar demo" : "Reanudar demo"}
                  className="flex size-14 items-center justify-center rounded-full border-2 border-accent text-xl text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                </button>
              </div>
            </section>
          )}
        </div>
      </section>

      <AudioConsole
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlayback={togglePlayback}
        onVolumeChange={setVolume}
      />

      <section
        aria-label="Estilos musicales de la radio"
        className="border-b border-border"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4 lg:px-8">
          <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
            En la señal:
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-wider text-muted">
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      </section>
      <FeaturedEpisodes />
    </main>
  );
}
