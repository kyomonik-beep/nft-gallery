import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  if (!address) return "";
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEth(value?: number) {
  if (value === undefined || value === null) return "--";
  return `${value.toFixed(4)} ETH`;
}

export function formatUsd(value?: number) {
  if (value === undefined || value === null) return "--";
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
