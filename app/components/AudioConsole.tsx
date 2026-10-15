"use client";

type AudioConsoleProps = {
  isPlaying: boolean;
  volume: number;
  onTogglePlayback: () => void;
  onVolumeChange: (volume: number) => void;
};

const waveform = Array.from(
  { length: 120 },
  (_, index) => 8 + ((index * 37 + index * index * 13) % 65),
);

const signalLevels = [6, 3, 8, 5, 7, 4];

export default function AudioConsole({
  isPlaying,
  volume,
  onTogglePlayback,
  onVolumeChange,
}: AudioConsoleProps) {
  return (
    <section
      aria-labelledby="console-title"
      className="border-b border-border bg-background px-5 py-6 lg:px-8"
    >
      <div className="relative mx-auto max-w-7xl border border-border bg-surface p-6 shadow-[inset_0_0_24px_#000] sm:p-8">
        {/* Tornillos decorativos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 flex flex-col justify-between"
        >
          {[0, 1].map((row) => (
            <div key={row} className="flex justify-between">
              <span className="size-2 rounded-full border border-border bg-black" />
              <span className="size-2 rounded-full border border-border bg-black" />
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_160px_180px]">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Señal 001 / Demo
            </p>

            <h2
              id="console-title"
              className="mt-2 font-mono text-sm uppercase tracking-[0.2em] sm:text-lg"
            >
              Sesión industrial
            </h2>

            <div className="mt-5 flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onTogglePlayback}
                aria-label={isPlaying ? "Pausar demo" : "Reproducir demo"}
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent text-2xl text-black transition-colors hover:bg-accent-hover sm:size-20"
              >
                <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
              </button>

              <div className="min-w-0 flex-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 80"
                  preserveAspectRatio="none"
                  className={`h-16 w-full transition-colors ${
                    isPlaying ? "text-accent" : "text-muted"
                  }`}
                >
                  {waveform.map((height, index) => (
                    <rect
                      key={index}
                      x={index * 5}
                      y={(80 - height) / 2}
                      width="2"
                      height={height}
                      rx="1"
                      fill="currentColor"
                    />
                  ))}
                </svg>

                <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[10px] text-muted">
                  <span>00:00</span>
                  <span>Audio pendiente</span>
                </div>

                <div aria-hidden="true" className="mt-2 h-1 bg-border" />
              </div>
            </div>

            <p
              role="status"
              className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {isPlaying ? "Reproducción simulada" : "Demo en pausa"}
            </p>
          </div>

          <div className="border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <label
              htmlFor="console-volume"
              className="block font-mono text-[10px] uppercase tracking-widest text-muted"
            >
              Volumen · {volume}%
            </label>

            <div className="mt-4 flex items-center gap-5 lg:flex-col">
              <div
                aria-hidden="true"
                className="flex size-20 shrink-0 items-center justify-center rounded-full p-0.75"
                style={{
                  background: `conic-gradient(
                    from 225deg,
                    var(--accent) 0deg ${volume * 2.7}deg,
                    var(--border) ${volume * 2.7}deg 270deg,
                    transparent 270deg 360deg
                  )`,
                }}
              >
                <div className="relative size-full rounded-full border border-border bg-[radial-gradient(circle_at_35%_30%,#393d3d,#080909_70%)]">
                  <span
                    className="absolute inset-1"
                    style={{
                      transform: `rotate(${-135 + volume * 2.7}deg)`,
                    }}
                  >
                    <span className="absolute top-1 left-1/2 h-4 w-0.5 -translate-x-1/2 bg-foreground" />
                  </span>
                </div>
              </div>

              <input
                id="console-volume"
                type="range"
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(event) => onVolumeChange(Number(event.target.value))}
                className="h-11 w-full min-w-0 accent-accent"
              />
            </div>
          </div>

          <div className="border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Nivel de señal
            </p>

            <div aria-hidden="true" className="mt-5 flex h-24 items-end gap-2">
              {signalLevels.map((level, column) => (
                <div
                  key={column}
                  className="flex flex-1 flex-col-reverse gap-1"
                >
                  {Array.from({ length: 10 }, (_, block) => (
                    <span
                      key={block}
                      className={`h-1.5 transition-colors ${
                        isPlaying && volume > 0 && block < level
                          ? "bg-accent"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-3 font-mono text-[9px] uppercase text-muted">
              Visualización simulada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
