import { create } from 'zustand';

const useItemStore = create((set) => ({
    items: [], // 습득한 아이템 리스트
    addItem: (newItem) => set((state) => ({
        items: [...state.items, newItem]
    })),
    resetItems: () => set({ items: [] }),
}));

export default useItemStore;