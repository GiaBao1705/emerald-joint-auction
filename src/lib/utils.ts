import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const APP_TIME_ZONE = "Asia/Ho_Chi_Minh";

function parseAppDate(value: string | Date): Date {
  if (value instanceof Date) return value;

  const trimmed = value.trim();
  // Datetime-local values and legacy SQL timestamps without an offset represent Vietnam local time.
  if (/^\d{4}-\d{2}-\d{2}(?:T| )\d{2}:\d{2}/.test(trimmed) && !/(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed)) {
    return new Date(`${trimmed.replace(" ", "T")}+07:00`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(`${trimmed}T00:00:00+07:00`);
  }
  return new Date(trimmed);
}

function getVietnamDateParts(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).reduce<Record<string, string>>((parts, part) => {
    if (part.type !== "literal") parts[part.type] = part.value;
    return parts;
  }, {});
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateDisplay(value: string | Date | null | undefined, includeTime = false) {
  if (!value) return "";
  const date = parseAppDate(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = getVietnamDateParts(date);
  const time = includeTime ? ` ${parts.hour}:${parts.minute}` : "";
  return `${parts.day}/${parts.month}/${parts.year}${time}`;
}

export function formatDateTimeForInput(value: string | null | undefined) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function parseDateTimeInput(value: string) {
  if (!value || !value.trim()) return "";

  const match = value.trim().match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*(\d{1,2}):(\d{2})\s*$/);
  if (!match) return value;

  const [, day, month, year, hour, minute] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));

  if (Number.isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toUtcIsoDateTime(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;

  const date = parseAppDate(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function toDateTimeLocalValue(value: string | null | undefined): string {
  if (!value) return "";

  const date = parseAppDate(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = getVietnamDateParts(date);
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}
