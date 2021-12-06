import { useEffect, useRef } from "react";

export const useDebounce = (
  debounceFunction: any,
  monitoringVariables: string[],
  debounceTime: number = 1000
) => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return () => { };
    } else {
      let timer = setTimeout(debounceFunction, debounceTime);
      return () => {
        clearTimeout(timer);
      };
    }
  }, monitoringVariables);
};