import type { CountryConfig } from "@/types/admin";

export function formatMoney(value: number, config: CountryConfig) {
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string, config: CountryConfig) {
  return new Intl.DateTimeFormat(config.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatNumber(value: number, config: CountryConfig) {
  return new Intl.NumberFormat(config.locale).format(value);
}