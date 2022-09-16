export function getIdFromUrl(url: string, name: string) {
  const pattern = `${name}\/([0-9]+)`;
  return url.match(pattern);
}
