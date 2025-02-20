import { create } from "zustand"
import { Client, Loan } from "../types";

interface AppState {
    stock: string;
    clients: Client[];
    loans: Loan[];
    addClient: (client: Client) => void;
    newLoan: (loan: Loan) => void;
}

export const useAppStore = create<AppState>((set) => ({
    stock: "100.000",
    clients: [],
    loans: [],
    addClient: (client) => set((state) => ({clients: [...state.clients, client] })),
    newLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
}))