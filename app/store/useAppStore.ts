import { create } from "zustand"
import { Client, Loan } from "../types";

interface AppState {
    stock: number;
    clients: Client[];
    loans: Loan[];
    history: Loan[];
    addClient: (client: Client) => void;
    deleteClient: (dni: string) => void;
    deleteLoan: (loanId: string) => void;
    newLoan: (loan: Loan) => void;
    addHistory: (history: Loan) => void;
    updateStock: (stock: number) => void;
    togglePagado: (id: string) => void;
    updateCuotasPagadas: (id: string, cuotas_pagadas: number[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
    stock: 100000,
    clients: [],
    loans: [],
    history: [],
    addClient: (client) => set((state) => ({clients: [...state.clients, client] })),
    deleteClient: (dni) => set((state) => ({
        clients: state.clients.filter(client => client.dni !== dni)
    })),
    deleteLoan: (loanId) => set((state) => ({
        loans: state.loans.filter(loan => loan.id_loan !== loanId)
    })),
    newLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
    addHistory: (history) => set((state) => ({ history: [...state.history, history] })),
    updateStock: (newStock) => set(() => ({ stock: newStock })),
    togglePagado: (id) => set((state) => ({
        loans: state.loans.map(loan => loan.id_loan === id ? { ...loan, pagado: !loan.pagado } : loan)
    })),
    updateCuotasPagadas: (id, cuotas_pagadas) => set((state) => ({
        loans: state.loans.map((loan) =>
            loan.id_loan === id ? { ...loan, cuotas_pagadas } : loan
        ),
    })),
}))