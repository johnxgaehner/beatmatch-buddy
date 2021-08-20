import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const storedData = localStorage.getItem(key);
  const initialData = storedData ? JSON.parse(storedData) : defaultValue;

  const [value, setValue] = useState(initialData);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
