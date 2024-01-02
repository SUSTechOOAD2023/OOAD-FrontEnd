export function noCacheHeader() {
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache');
  headers.append('Pragma', 'no-cache');
  return headers;
}
