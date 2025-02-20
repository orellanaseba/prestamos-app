import { create } from "zustand"
import { Client } from "../types";

interface AppState {
    stock: number;
    clients: Client[];
    addClient: (client: Client) => void; 
}

export const useAppStore = create<AppState>((set) => ({
    stock: 100.000,
    clients: [],
    addClient: (client) => set((state) => ({clients: [...state.clients, client] })),
}))