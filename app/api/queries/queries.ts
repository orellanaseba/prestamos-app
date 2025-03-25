import { Client, Loan } from "@/app/types";
import axios from "axios";

export const saveClientToDB = async (client: Client) => {
    try {
        const response = await axios.post("/api/clients/create", client);
        return response.data;
    }
    catch(err) {
        console.log("Error al guardar el cliente", err);
        throw new Error("Error al guardar el cliente")
    }
}

export const getClients = async () => {
    try {
        const response = await axios.get("/api/clients/get")
        return response.data;
    }
    catch(err) {
        console.log("Error al obtener los clientes", err);
        throw new Error("Error al obtener los clientes")
    }
}

export const deleteclientDb = async (id_cliente: string) => {
    try {
        const response = await axios.delete("/api/clients/delete", {
            data: { id_cliente },
        });
        return response.data;
    }
    catch(err) {
        console.log("Error al eliminar el cliente", err);
        throw new Error("Error al eliminar el cliente");
    }
}

export const editarCliente = async (dataForm: Client) => {
    try {
        const response = await axios.put("/api/clients/actualizar", dataForm);
        return response.data;
    }
    catch(err) {
        console.log("Error al actualizar el cliente", err);
        throw new Error("Error al actualizar el cliente");
    }
}

export const createLoan = async (loan: Loan) => {
    try {
        const response = await axios.post("/api/loans/create", loan);
        return response.data;
    }
    catch(err) {
        console.log("Error al crear el préstamo", err);
        throw new Error("Error al crear el préstamo");
    }
}

export const getLoans = async () => {
    try {
        const response = await axios.get("/api/loans/get");
        return response.data;
    }
    catch(err) {
        console.log("Error al obtener los préstamos", err);
        throw new Error("Error al obtener los préstamos")
    }
}

export const deleteLoanDb = async (id_loan: string) => {
    try {
        const response = await axios.delete("/api/loans/delete", {
            data: { id_loan },
        });
        return response.data;
    }
    catch(err) {
        console.log("Error al eliminar el cliente", err);
        throw new Error("Error al eliminar el cliente");
    }
}