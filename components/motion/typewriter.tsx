"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: readonly string[];
  className?: string;
  typingMs?: number;
  holdMs?: number;
}

/** Cycles through phrases with a typing effect. Static for reduced motion. */
export function Typewriter({
  phrases,
  className,
  typingMs = 55,
  holdMs = 2200,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[phraseIndex % phrases.length];

  useEffect(() => {
    if (reduceMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charCount < phrase.length) {
      timeout = setTimeout(() => setCharCount((c) => c + 1), typingMs);
    } else if (!deleting && charCount === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && charCount > 0) {
      timeout = setTimeout(() => setCharCount((c) => c - 1), typingMs / 2);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [charCount, deleting, phrase, phrases.length, reduceMotion, typingMs, holdMs]);

  if (reduceMotion) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={className} aria-label={phrase}>
      <span aria-hidden>{phrase.slice(0, charCount)}</span>
      <span aria-hidden className="animate-blink text-accent">
        _
      </span>
    </span>
  );
}
