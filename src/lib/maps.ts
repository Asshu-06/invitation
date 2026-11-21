/** Google Maps directions link built from the venue name and address (no coordinates). */
export function getDirectionsUrl(name: string, address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}`)}`;
}

/** Keyless Google Maps embed that searches for the venue by name and address. */
export function getMapEmbedUrl(name: string, address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${name}, ${address}`)}&output=embed`;
}
