"use client"

import { useEffect, useState } from "react";
import { Client } from "@/app/types";

const Deal = () => {

    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        const getClients = localStorage.getItem("clients")
        const result = getClients ? JSON.parse(getClients) : [];
        setClients(result);
    }, [])

    return (
        <main>
            <select name="clients">
                {clients.length > 0 ? (clients.map((client: Client) => (
                    <option key={client.dni} value={client.dni}>{client.nombre} - {client.dni}</option>
                ))
                ) : <option>No hay clientes disponibles</option>}
            </select>
        </main>
    )
}

export default Deal;