"use client";

import { useEffect, useState } from "react";
import { useRadio } from "./RadioProvider";

const bands = [
  { from: 40, to: 120 },
  { from: 120, to: 300 },
  { from: 300, to: 800 },
  { from: 800, to: 2000 },
  { from: 2000, to: 6000 },
  { from: 6000, to: 16000 },
];

export default function SignalMeter() {
  const { analyser, isPlaying, volume } = useRadio();
  const [levels, setLevels] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!analyser || !isPlaying) return;

    const data = new Uint8Array(analyser.frequencyBinCount);
    const binWidth = analyser.context.sampleRate / analyser.fftSize;

    let frameId = 0;
    let lastUpdate = 0;

    function update(timestamp: number) {
      if (!analyser) return;

      // Actualizamos la interfaz unas 20 veces por segundo.
      if (timestamp - lastUpdate >= 50) {
        analyser.getByteFrequencyData(data);

        const nextLevels = bands.map(({ from, to }) => {
          const start = Math.min(data.length - 1, Math.floor(from / binWidth));

          const end = Math.min(
            data.length,
            Math.max(start + 1, Math.ceil(to / binWidth)),
          );

          let total = 0;

          for (let index = start; index < end; index += 1) {
            total += data[index];
          }

          const average = total / (end - start);

          return Math.min(10, Math.round((average / 255) * 10));
        });

        setLevels(nextLevels);
        lastUpdate = timestamp;
      }

      frameId = requestAnimationFrame(update);
    }

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [analyser, isPlaying]);

  return (
    <div className="border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        Espectro de audio
      </p>

      <div aria-hidden="true" className="mt-5 flex h-24 items-end gap-2">
        {bands.map((band, column) => {
          const level =
            isPlaying && analyser && volume > 0 ? levels[column] : 0;

          return (
            <div key={band.from} className="flex flex-1 flex-col-reverse gap-1">
              {Array.from({ length: 10 }, (_, block) => (
                <span
                  key={block}
                  className={`h-1.5 transition-colors duration-75 ${
                    block < level ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[9px] uppercase text-muted">
        Graves → Agudos
      </p>
    </div>
  );
}
