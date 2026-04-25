import { useAppStore } from "./useAppStore";

export const useLang = () => {
  return useAppStore((state) => state.lang);
};
