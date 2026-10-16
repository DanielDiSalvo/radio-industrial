"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RadioContextValue = {
  isPlayerOpen: boolean;
  isPlaying: boolean;
  volume: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
  currentTime: number;
  duration: number;
  seek: (seconds: number) => void;
  analyser: AnalyserNode | null;
};

type AudioGraph = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
  analyser: AnalyserNode;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export default function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestRef = useRef(0);
  const isStartingRef = useRef(false);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, updateVolume] = useState(70);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioGraphRef = useRef<AudioGraph | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  function setVolume(value: number) {
    if (!Number.isFinite(value)) return;

    updateVolume(Math.max(0, Math.min(100, value)));
  }

  function getAudioGraph(audio: HTMLAudioElement): AudioGraph {
    if (audioGraphRef.current) {
      return audioGraphRef.current;
    }

    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const analyserNode = context.createAnalyser();

    analyserNode.fftSize = 2048;
    analyserNode.smoothingTimeConstant = 0.8;
    analyserNode.minDecibels = -90;
    analyserNode.maxDecibels = -10;

    source.connect(analyserNode);
    analyserNode.connect(context.destination);

    const graph = {
      context,
      source,
      analyser: analyserNode,
    };

    audioGraphRef.current = graph;
    setAnalyser(analyserNode);

    return graph;
  }

  async function playAudio() {
    const audio = audioRef.current;

    if (!audio) return;

    setIsPlayerOpen(true);
    setError(null);

    // Evita iniciar varias solicitudes mientras carga.
    if (!audio.paused || isStartingRef.current) return;

    if (audio.ended) {
      audio.currentTime = 0;
    }

    const requestId = ++playRequestRef.current;
    isStartingRef.current = true;

    try {
      const graph = getAudioGraph(audio);

      await Promise.all([graph.context.resume(), audio.play()]);
    } catch (playError) {
      // Ignora solicitudes canceladas al pausar o cerrar.
      if (requestId !== playRequestRef.current) return;

      setIsPlaying(false);

      if (
        playError instanceof DOMException &&
        playError.name === "AbortError"
      ) {
        return;
      }

      setError(
        "No pudimos reproducir la demo. Verificá el archivo e intentá nuevamente.",
      );
    } finally {
      if (requestId === playRequestRef.current) {
        isStartingRef.current = false;
      }
    }
  }

  function startListening() {
    void playAudio();
  }

  function pauseAudio() {
    playRequestRef.current += 1;
    isStartingRef.current = false;

    audioRef.current?.pause();
    setIsPlaying(false);
  }

  function stopListening() {
    pauseAudio();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setCurrentTime(0);
    setIsPlayerOpen(false);
    setError(null);
  }

  function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused || isStartingRef.current) {
      pauseAudio();
      return;
    }

    startListening();
  }

  function seek(seconds: number) {
    const audio = audioRef.current;

    if (
      !audio ||
      !Number.isFinite(seconds) ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    const nextTime = Math.max(0, Math.min(audio.duration, seconds));

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <RadioContext.Provider
      value={{
        isPlayerOpen,
        isPlaying,
        volume,
        error,
        currentTime,
        duration,
        seek,
        startListening,
        stopListening,
        togglePlayback,
        setVolume,
        analyser,
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/demo-industrial.mp3"
        preload="metadata"
        playsInline
        onPlaying={(event) => {
          const audio = event.currentTarget;

          if (!audio.paused) {
            setIsPlaying(true);
            setError(null);
          }

          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration);
          }
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          isStartingRef.current = false;
          setIsPlaying(false);
        }}
        onError={() => {
          playRequestRef.current += 1;
          isStartingRef.current = false;
          setIsPlaying(false);
          setError(
            "No pudimos cargar el audio de la demo. Revisá que el archivo esté disponible.",
          );
        }}
        onLoadedMetadata={(event) => {
          const value = event.currentTarget.duration;
          setDuration(Number.isFinite(value) ? value : 0);
        }}
        onDurationChange={(event) => {
          const value = event.currentTarget.duration;
          setDuration(Number.isFinite(value) ? value : 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onSeeked={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
      />

      {children}

      {error && (
        <div
          role="alert"
          className="border-t border-accent bg-background px-5 py-4 text-center text-sm text-foreground"
        >
          {error}
        </div>
      )}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);

  if (context === null) {
    throw new Error("useRadio debe usarse dentro de RadioProvider");
  }

  return context;
}
