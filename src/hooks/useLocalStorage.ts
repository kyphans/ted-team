import { useState } from "react";

type SetValueFunction = (newValue: string) => void;
type UseLocalStorageType = [string, SetValueFunction];

export const useLocalStorage = (keyName:string, defaultValue:string = '') : UseLocalStorageType => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue:string) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};