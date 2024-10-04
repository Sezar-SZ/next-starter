import { create } from "zustand";

interface StoreType {
  someState: string;
  setSomeState: (someState: string) => void;
}

const useStore = create<StoreType>((set) => ({
  someState: "",
  setSomeState: (someState) => set(() => ({ someState })),
}));

export default useStore;
