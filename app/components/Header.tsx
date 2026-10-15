"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Programación", href: "/programacion" },
  { label: "Archivo", href: "/archivo" },
  { label: "La radio", href: "/la-radio" },
];

type HeaderProps = {
  onListen: () => void;
  activePath?: string;
};

export default function Header({ onListen, activePath = "/" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleListen() {
    setIsMenuOpen(false);
    onListen();
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="relative z-20 border-b border-border bg-background">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3"
          aria-label="Radio Industrial — Inicio"
        >
          <span
            aria-hidden="true"
            className="flex h-9 shrink-0 items-center gap-1 text-accent"
          >
            {[16, 30, 22, 36, 18].map((height, index) => (
              <span key={index} className="w-1 bg-current" style={{ height }} />
            ))}
          </span>

          <span className="font-display text-2xl font-bold uppercase sm:text-3xl">
            Radio Industrial
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 font-mono text-xs">
            {navigation.map(({ label, href }) => {
              const isActive = activePath === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-block border-b-2 py-2 transition-colors hover:text-accent ${
                      isActive ? "border-accent" : "border-transparent"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={handleListen}
          className="hidden border border-accent px-5 py-3 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-white lg:block"
        >
          Escuchar en vivo
        </button>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex size-11 shrink-0 items-center justify-center border border-border text-2xl lg:hidden"
        >
          <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!isMenuOpen}
        className="border-t border-border px-5 py-5 lg:hidden"
      >
        <ul className="flex flex-col gap-2 font-mono text-sm">
          {navigation.map(({ label, href }) => {
            const isActive = activePath === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center hover:text-accent ${
                    isActive ? "text-accent" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={handleListen}
          className="mt-4 min-h-12 w-full bg-accent px-5 font-mono text-xs uppercase tracking-wider text-white hover:bg-accent-hover"
        >
          Escuchar en vivo
        </button>
      </nav>
    </header>
  );
}
