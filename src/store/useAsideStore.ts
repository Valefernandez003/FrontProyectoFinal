import { create } from "zustand";

interface AsideState {
  open: boolean;
  toggleOpen: () => void;
  setOpen: (value: boolean) => void;
}

export const useAsideStore = create<AsideState>((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setOpen: (value) => set({ open: value }),
}));
