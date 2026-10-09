/** Removes typographic dash separators from user-facing copy without changing source keys. */
export function withoutLongDashes(value: string): string {
  return value
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1 to $2')
    .replace(/\s+[–—]\s+/g, ', ')
    .replace(/[–—]/g, ' ')
    .replace(/\s{2,}/g, ' ');
}
