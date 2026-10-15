"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type RadioContextValue = {
  isPlayerOpen: boolean;
  isPlaying: boolean;
  volume: number;
  startListening: () => void;
  stopListening: () => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export default function RadioProvider({ children }: { children: ReactNode }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);

  function startListening() {
    setIsPlayerOpen(true);
    setIsPlaying(true);
  }

  function stopListening() {
    setIsPlaying(false);
    setIsPlayerOpen(false);
  }

  function togglePlayback() {
    if (!isPlayerOpen) {
      startListening();
      return;
    }

    setIsPlaying((playing) => !playing);
  }

  return (
    <RadioContext.Provider
      value={{
        isPlayerOpen,
        isPlaying,
        volume,
        startListening,
        stopListening,
        togglePlayback,
        setVolume,
      }}
    >
      {children}
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
