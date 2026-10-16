"use client";

import { useRadio } from "./RadioProvider";
import SignalMeter from "./SignalMeter";

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

function formatTime(seconds: number) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(remainingSeconds).padStart(2, "0");

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function AudioConsole({
  isPlaying,
  volume,
  onTogglePlayback,
  onVolumeChange,
}: AudioConsoleProps) {
  const { currentTime, duration, seek } = useRadio();

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
          {/* Reproducción y posición */}
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
                {/* Onda decorativa; todavía no representa el MP3 */}
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
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <input
                  type="range"
                  aria-label="Posición de reproducción"
                  aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
                  min={0}
                  max={duration > 0 ? duration : 1}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  disabled={duration <= 0}
                  onChange={(event) => seek(Number(event.target.value))}
                  className="h-11 w-full accent-accent disabled:opacity-40"
                />
              </div>
            </div>

            <p
              role="status"
              className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {isPlaying ? "Reproduciendo demo" : "En pausa"}
            </p>
          </div>

          {/* Volumen */}
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
                className="flex size-20 shrink-0 items-center justify-center rounded-full p-[3px]"
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

          {/* Espectro real del audio */}
          <SignalMeter />
        </div>
      </div>
    </section>
  );
}
