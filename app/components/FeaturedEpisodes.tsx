import Link from "next/link";

const episodes = [
  {
    id: "pulso-ebm",
    category: "Último episodio",
    title: "Pulso EBM",
    description:
      "Ritmos, máquinas y la energía de la pista. Un recorrido por el EBM clásico y contemporáneo.",
    duration: "58:24",
    artwork: "bg-[linear-gradient(135deg,#555_0%,#161818_45%,#090a0a_70%)]",
    number: "01",
  },
  {
    id: "maquinas-y-ruido",
    category: "Especial",
    title: "Máquinas y ruido",
    description:
      "Exploraciones sonoras entre el industrial, el noise y sus raíces. Influencias, discos y contexto.",
    duration: "1:12:08",
    artwork:
      "bg-[radial-gradient(circle_at_center,#555_0%,#151717_45%,#090a0a_70%)]",
    number: "02",
  },
  {
    id: "archivo-oscuro",
    category: "Selección",
    title: "Archivo oscuro",
    description:
      "Joyas, rarezas y material de la escena. Un viaje por el pasado y el presente del sonido subterráneo.",
    duration: "1:04:17",
    artwork:
      "bg-[linear-gradient(90deg,#090a0a_0%,#444_50%,#111313_55%,#090a0a_100%)]",
    number: "03",
  },
];

export default function FeaturedEpisodes() {
  return (
    <section
      aria-labelledby="featured-title"
      className="bg-background px-5 py-10 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h2
            id="featured-title"
            className="font-display text-3xl font-bold uppercase sm:text-4xl"
          >
            En la frecuencia
          </h2>

          <div
            aria-hidden="true"
            className="hidden h-px flex-1 bg-border sm:block"
          />

          <p className="max-w-xs font-mono text-[10px] uppercase leading-5 tracking-wider text-muted">
            Programas, especiales y archivo sonoro de Radio Industrial.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {episodes.map((episode) => (
            <article
              key={episode.id}
              className="flex min-w-0 flex-col border border-border bg-surface/40 p-4 transition-colors hover:border-muted"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {episode.category}
                </p>

                <span className="font-mono text-[10px] text-muted">
                  EP. {episode.number}
                </span>
              </div>

              <div className="flex flex-1 gap-4">
                <div
                  aria-hidden="true"
                  className={`relative flex w-24 shrink-0 items-end overflow-hidden border border-border p-3 sm:w-28 ${episode.artwork}`}
                >
                  <span className="absolute inset-y-0 right-0 w-2 bg-accent" />

                  <span className="font-display text-5xl font-bold text-white/40">
                    {episode.number}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-display text-2xl font-semibold">
                    {episode.title}
                  </h3>

                  <p className="mt-3 flex-1 text-xs leading-6 text-muted">
                    {episode.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/archivo#${episode.id}`}
                      aria-label={`Ver ${episode.title} en el archivo`}
                      className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-accent"
                    >
                      Ver episodio
                      <span aria-hidden="true">↗</span>
                    </Link>

                    <span className="font-mono text-[10px] text-muted">
                      {episode.duration}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside
          aria-labelledby="next-broadcast-title"
          className="mt-5 flex flex-col gap-5 border border-border bg-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <h3
              id="next-broadcast-title"
              className="font-mono text-[10px] uppercase tracking-widest"
            >
              <span aria-hidden="true" className="mr-2 text-accent">
                ●
              </span>
              Próxima transmisión
            </h3>

            <div className="sm:border-l sm:border-border sm:pl-6">
              <p className="font-mono text-xs">Viernes · 22:00</p>
              <p className="mt-1 text-xs text-muted">
                Especial: Sonidos de la fábrica
              </p>
              <p className="mt-1 font-mono text-[9px] text-muted">
                Horario de Buenos Aires
              </p>
            </div>
          </div>

          <Link
            href="/programacion"
            className="inline-flex min-h-11 items-center gap-3 font-mono text-xs text-accent underline underline-offset-4 hover:text-foreground"
          >
            Ver programación
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
