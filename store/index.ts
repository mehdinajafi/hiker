import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IStore {
  cart: { id: string | null };
  setCartId: (id: string) => void;
}

const useStore = create<IStore>()(
  persist(
    (set) => ({
      cart: {
        id: null,
      },
      setCartId: (id: string) => set({ cart: { id } }),
    }),
    {
      name: "persist:APP",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useStore;
