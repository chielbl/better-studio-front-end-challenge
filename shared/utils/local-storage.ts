type localStoreKey = "logDetail";

function get<T>(key: localStoreKey): T | undefined {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : undefined;
  }
  return undefined;
}

function set<T>(key: localStoreKey, data: T) {
  if (!data) return localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
}

export const localStore = {
  get,
  set,
};
