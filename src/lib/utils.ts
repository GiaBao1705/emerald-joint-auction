import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateDisplay(value: string | Date | null | undefined, includeTime = false) {
  if (!value) return "";

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      date = new Date(`${trimmed}T00:00:00`);
    } else {
      date = new Date(trimmed);
    }
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const time = includeTime ? ` ${pad(date.getHours())}:${pad(date.getMinutes())}` : "";

  return `${day}/${month}/${year}${time}`;
}
