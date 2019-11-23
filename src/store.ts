const mockStore: { [key: string]: string } = {};
export function storeInLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    mockStore[key] = value;
  }
}
