import { API_BASE_URL, DEFAULT_API_REQ_HEADERS } from "./apiConstants";

function createBin(body: string, password?: string) {
  return fetch(`${API_BASE_URL}/bins/`, {
    method: "POST",
    headers: DEFAULT_API_REQ_HEADERS,
    body: JSON.stringify({
      body,
      password: password?.length ? password : undefined,
    }),
  });
}

function getBin(binId: string, password?: string) {
  return fetch(`${API_BASE_URL}/readbins/`, {
    method: "POST",
    headers: DEFAULT_API_REQ_HEADERS,
    body: JSON.stringify({
      id: binId,
      password: password?.length ? password : undefined,
    }),
  });
}

export { createBin, getBin };
