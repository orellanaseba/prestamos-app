import { create } from "zustand"
import { Client, Loan } from "../types";

interface AppState {
    stock: number;
    clients: Client[];
    loans: Loan[];
    addClient: (client: Client) => void;
    deleteClient: (dni: string) => void;
    newLoan: (loan: Loan) => void;
    updateStock: (stock: number) => void;
    togglePagado: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    stock: 100000,
    clients: [],
    loans: [],
    addClient: (client) => set((state) => ({clients: [...state.clients, client] })),
    deleteClient: (dni) => set((state) => ({
        clients: state.clients.filter(client => client.dni !== dni)
    })),
    newLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
    updateStock: (newStock) => set(() => ({ stock: newStock })),
    togglePagado: (id) => set((state) => ({
        loans: state.loans.map(loan => loan.id_loan === id ? { ...loan, pagado: !loan.pagado } : loan)
    }))
}))