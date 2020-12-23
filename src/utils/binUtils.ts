export function getBinUrlFromId(binId: string, password?: string) {
  let url = `${window.location.origin}/view/${binId}`;
  if (password) url += `?password=${password}`;
  return url;
}
