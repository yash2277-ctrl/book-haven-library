import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-100px") as "-100px",
  });

  return { ref, isInView };
}
