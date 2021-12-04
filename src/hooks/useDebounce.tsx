import { useEffect } from "react";

export const useDebounce = (
  debounceFunction : any,
  monitoringVariables: Array<String> = [],
  debounceTime: number = 500
) => {
  useEffect(() => {
    let timer = setTimeout(debounceFunction, debounceTime);
    return () => {
      clearTimeout(timer);
    };
  }, monitoringVariables);
};