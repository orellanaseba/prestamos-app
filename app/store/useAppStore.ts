import { create } from "zustand"
import { Client, Loan } from "../types";

interface AppState {
    stock: number;
    clients: Client[];
    loans: Loan[];
    history: Loan[];
    addClient: (client: Client) => void;
    deleteClient: (id_cliente: string) => void;
    deleteLoan: (loanId: string) => void;
    newLoan: (loan: Loan) => void;
    addHistory: (history: Loan) => void;
    updateStock: (stock: number) => void;
    togglePagado: (id: string) => void;
    updateCuotasPagadas: (id: string, cuotas_pagadas: number[]) => void;
    updateClient: (client: Client) => void;
    deleteHistory: (historyId: string) => void;
    setClients: (clients: Client[]) => void;
    setLoans: (loans: Loan[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
    stock: 100000,
    clients: [],
    loans: [],
    history: [],
    addClient: (client) => set((state) => ({clients: [...state.clients, client] })),
    deleteClient: (id_cliente) => set((state) => ({
        clients: state.clients.filter(client => client.id_cliente !== id_cliente)
    })),
    setClients: (clients) => set(() => ({ clients })),
    setLoans: (loans) => set(() => ({ loans })),
    deleteLoan: (loanId) => set((state) => ({
        loans: state.loans.filter(loan => loan.id_loan !== loanId)
    })),
    
    deleteHistory: (historyId) => set((state) => ({
        history: state.history.filter(h => h.id_loan !== historyId)
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
    updateClient: (updatedClient) => set((state) => {
        const clientExists = state.clients.some(client => client.id_cliente === updatedClient.id_cliente);
        if (!clientExists) {
            console.error(`Cliente con ID ${updatedClient.id_cliente} no encontrado.`);
            return state; // No actualiza el estado si el cliente no existe
        }
    
        // Obtener el cliente original antes de actualizar
        const originalClient = state.clients.find(client => client.id_cliente === updatedClient.id_cliente);
    
        // Actualizar los clientes
        const updatedClients = state.clients.map(client =>
            client.id_cliente === updatedClient.id_cliente ? { ...client, ...updatedClient } : client
        );
    
        // Si el DNI cambió, actualizar los préstamos asociados
        if (originalClient?.dni !== updatedClient.dni) {
            const updatedLoans = state.loans.map(loan =>
                loan.dni_cliente === originalClient?.dni
                    ? { ...loan, dni_cliente: updatedClient.dni }
                    : loan
            );
    
            return {
                clients: updatedClients,
                loans: updatedLoans, // Actualizar los préstamos en el estado global
            };
        }
    
        return {
            clients: updatedClients,
        };
    }),
}))