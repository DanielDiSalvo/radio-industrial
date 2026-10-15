"use client";

import Link from "next/link";
import Header from "../components/Header";
import AudioConsole from "../components/AudioConsole";
import { useRadio } from "../components/RadioProvider";

const pillars = [
  {
    number: "01",
    title: "Música",
    description:
      "Exploramos sonidos industriales, EBM y sus cruces. De los clásicos a las propuestas actuales, con espacio para descubrir algo nuevo.",
  },
  {
    number: "02",
    title: "Cultura",
    description:
      "Discos, historias e influencias. Un espacio para conocer el contexto y las ideas que atraviesan la escena industrial.",
  },
  {
    number: "03",
    title: "Comunidad",
    description:
      "Un punto de encuentro para quienes escuchan, crean y comparten. La curiosidad y el intercambio también forman parte de la señal.",
  },
];

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

export default function AboutPage() {
  const { isPlaying, volume, startListening, togglePlayback, setVolume } =
    useRadio();

  return (
    <>
      <Header activePath="/la-radio" onListen={startListening} />

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
              La radio / Nuestra señal
            </p>

            <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold uppercase leading-tight sm:text-7xl lg:text-8xl">
              Una señal
              <br />
              independiente
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-6 font-mono text-sm uppercase leading-7 tracking-widest sm:text-base">
              Desde Buenos Aires.
              <br />
              Para el underground.
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-muted sm:text-base">
              Radio Industrial nace como un espacio para explorar la música
              industrial, el EBM y los sonidos de la escena oscura. Una emisión
              semanal para compartir discos, historias y descubrimientos.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
          <section aria-label="Los pilares de la radio">
            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="border border-border bg-surface/40 p-6"
                >
                  <p className="font-mono text-xs tracking-widest text-accent">
                    / {pillar.number}
                  </p>

                  <h2 className="mt-5 font-display text-3xl font-bold uppercase">
                    {pillar.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="genres-title"
            className="mt-8 border border-border p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <h2
                id="genres-title"
                className="shrink-0 font-display text-3xl font-bold uppercase"
              >
                Qué suena acá
              </h2>

              <p className="max-w-xl text-sm leading-7 text-muted sm:border-l sm:border-border sm:pl-8">
                Una selección de sonidos de la escena industrial y sus
                alrededores. Intensidad, atmósferas y experimentación.
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-3">
              {genres.map((genre) => (
                <li
                  key={genre}
                  className="border border-border bg-surface/40 px-4 py-3 font-mono text-[10px] uppercase tracking-wider"
                >
                  <span aria-hidden="true" className="mr-3 text-accent">
                    /
                  </span>
                  {genre}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="weekly-title"
            className="mt-8 grid gap-6 border border-border bg-surface/40 p-6 sm:p-8 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Una cita con la escena
              </p>

              <h2
                id="weekly-title"
                className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl"
              >
                Una emisión semanal.
                <br />
                Mucho por descubrir.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-muted">
                Cada encuentro propone un recorrido: un estilo, un disco, una
                influencia o una selección para escuchar con atención. El
                archivo será el lugar para volver a esas emisiones.
              </p>

              <Link
                href="/programacion"
                className="mt-5 inline-flex min-h-12 items-center gap-4 font-mono text-xs uppercase tracking-wider text-accent underline underline-offset-4 hover:text-foreground"
              >
                Explorar programación
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          <section
            aria-labelledby="join-title"
            className="mt-8 flex flex-col gap-6 border border-border p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h2
                id="join-title"
                className="font-display text-3xl font-bold uppercase sm:text-4xl"
              >
                Sumate a la señal
                <span className="text-accent">.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                Si estos sonidos también forman parte de tu mundo, este espacio
                es para vos. Empezá a explorar nuestra selección de programas.
              </p>
            </div>

            <Link
              href="/archivo"
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-4 bg-accent px-7 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-accent-hover"
            >
              Explorar archivo
              <span aria-hidden="true">→</span>
            </Link>
          </section>
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
