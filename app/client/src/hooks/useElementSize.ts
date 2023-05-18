import { useCallback, useEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export default function useElementSize<
  T extends HTMLElement = HTMLDivElement
>(): [React.MutableRefObject<T | null>, Size] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const resize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });
  }, [ref]);
  useEffect(resize, [resize]);
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  return [ref, size];
}
