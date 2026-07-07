"use client";
import { useState, useCallback, useRef, type ReactNode } from "react";

const chars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleTextProps {
  children: string;
  className?: string;
  as?: "span" | "p" | "h3" | "h4";
  scrambleSpeed?: number;
  revealDelay?: number;
}

export function ScrambleText({
  children,
  className = "",
  as: Tag = "span",
  scrambleSpeed = 30,
  revealDelay = 15,
}: ScrambleTextProps) {
  const [text, setText] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const target = children;
    const len = target.length;
    let currentIndex = 0;

    intervalRef.current = setInterval(() => {
      const result = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < currentIndex) return target[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setText(result);

      if (currentIndex >= len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(target);
      }
      currentIndex++;
    }, scrambleSpeed);
  }, [children, scrambleSpeed]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setText(children);
  }, [children]);

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      data-cursor-hover
    >
      {text}
    </Tag>
  );
}
