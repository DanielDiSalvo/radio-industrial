"use client";

import Link from "next/link";
import Header from "../components/Header";
import AudioConsole from "../components/AudioConsole";
import { useRadio } from "../components/RadioProvider";

const upcomingShows = [
  {
    id: "maquinas-y-ruido",
    week: "01",
    title: "Máquinas y ruido",
    genres: "Industrial / Noise",
    description:
      "Texturas, maquinaria y exploraciones sonoras. Influencias, discos y contexto.",
  },
  {
    id: "pulso-ebm",
    week: "02",
    title: "Pulso EBM",
    genres: "EBM clásico y contemporáneo",
    description:
      "Ritmos, sintetizadores y la energía de la pista. Clásicos y nuevos descubrimientos.",
  },
  {
    id: "archivo-oscuro",
    week: "03",
    title: "Archivo oscuro",
    genres: "Martial industrial / Power electronics / Experimental",
    description:
      "Rarezas, atmósferas y sonidos extremos. Un recorrido por el underground.",
  },
];

export default function ProgrammingPage() {
  const { isPlaying, volume, startListening, togglePlayback, setVolume } =
    useRadio();

  return (
    <>
      <Header activePath="/programacion" onListen={startListening} />

      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[url('/images/hero-industrial.png')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Buenos Aires / Radio online
            </p>

            <h1 className="mt-5 break-words font-display text-5xl font-bold uppercase sm:text-7xl lg:text-8xl">
              Programación
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-5 font-mono text-xs uppercase leading-6 tracking-widest">
              Una cita semanal con el sonido underground.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Agenda de ejemplo · Fechas por confirmar
          </p>

          <section
            aria-labelledby="next-show-title"
            className="border border-border bg-surface/40 p-5 sm:p-7"
          >
            <p className="font-mono text-xs uppercase tracking-widest">
              <span aria-hidden="true" className="mr-2 text-accent">
                ●
              </span>
              Próxima emisión
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)]">
              <div className="flex flex-col justify-center bg-accent p-6 text-black">
                <p className="font-mono text-sm font-semibold uppercase tracking-widest">
                  Viernes
                </p>
                <p className="mt-2 font-display text-6xl font-bold">22:00</p>
                <p className="mt-4 font-mono text-[10px]">Buenos Aires</p>
              </div>

              <div className="flex flex-col justify-center">
                <h2
                  id="next-show-title"
                  className="font-display text-4xl font-bold uppercase sm:text-5xl"
                >
                  Sesión industrial
                </h2>

                <p className="mt-3 font-mono text-xs uppercase leading-6 tracking-wider text-accent">
                  Industrial / EBM / Dark electro
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                  Una hora para compartir sonidos de la escena oscura. Música,
                  historias y descubrimientos desde Buenos Aires.
                </p>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-wider">
                  Duración estimada: 60 minutos
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="upcoming-title" className="mt-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="upcoming-title"
                className="font-display text-3xl font-bold uppercase"
              >
                En las próximas semanas
              </h2>

              <p className="font-mono text-[10px] uppercase text-muted">
                Horarios de Buenos Aires
              </p>
            </div>

            <div className="divide-y divide-border border border-border">
              {upcomingShows.map((show) => (
                <article
                  key={show.id}
                  className="grid gap-5 bg-surface/30 p-5 sm:p-6 lg:grid-cols-[100px_minmax(0,1fr)_180px]"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    Semana
                    <span className="ml-2 text-accent lg:mt-2 lg:ml-0 lg:block">
                      {show.week}
                    </span>
                  </p>

                  <div>
                    <h3 className="font-display text-2xl font-semibold">
                      {show.title}
                    </h3>

                    <p className="mt-2 font-mono text-[10px] uppercase leading-5 tracking-wider text-accent">
                      {show.genres}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                      {show.description}
                    </p>
                  </div>

                  <p className="font-mono text-xs lg:text-right">
                    Viernes · 22:00
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="mt-8 flex flex-col gap-5 border border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="font-display text-2xl font-semibold uppercase">
                ¿Te perdiste una emisión?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Volvé a escuchar nuestros programas en el archivo.
              </p>
            </div>

            <Link
              href="/archivo"
              className="inline-flex min-h-12 items-center justify-center gap-4 border border-accent px-6 font-mono text-xs uppercase tracking-wider text-accent hover:bg-accent hover:text-white"
            >
              Ver archivo
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
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
