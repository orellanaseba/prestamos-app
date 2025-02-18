"use client"

import { useEffect, useState } from "react";
import { PlusIcon } from "../components/PlusIcon";
import { FormClient } from "../components/FormClient";

import { Client } from "../types";
import { UserCard } from "../components/UserCard";
import { Input } from "../components/Input";

const mock: Client[] = [
    {
        nombre: "Sebastián Orellana",
        dni: "10101010",
        email: "sebacorreo@gmail.com",
        numero_telefono: "11281231",
    },
    {
        nombre: "Sebastián",
        dni: "30120120",
        email: "seba2@gmail.com",
        numero_telefono: "11220009",
    },
    {
        nombre: "Candela",
        dni: "30120190",
        email: "cande@gmail.com",
        numero_telefono: "11220009",
    }
]

const Clients = () => {
    const [openModal, setIsOpenModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [error, setError] = useState(false);
    const [clientSelected, setClientSelected] = useState(false);

    const [clients, setClients] = useState<Client[]>(mock);

    useEffect(() => {
        const getItem = localStorage.getItem("clients");
        const result = getItem ? JSON.parse(getItem) : mock;
        setClients(result);
    }, [])
    
    const handleClientSelected = () => {
        setClientSelected(!clientSelected);
    }


    const handleOpenModal = () => {
        setIsOpenModal(!openModal);
    }

    const filteredClients = clients.filter(client => (
        client.nombre.toLowerCase().includes(clientName.toLowerCase())
    ))

    return (
        <main className="flex flex-col items-center">
            <section className="mt-5">
                <article className="flex flex-col justify-around items-center p-1 w-72 bg-white shadow-sm rounded-md min-h-10 relative">
                    <div className="flex justify-around items-center min-h-10">
                        <h2 className="font-semibold">Clientes</h2>
                        <PlusIcon handleOpenModal={handleOpenModal} />
                    </div>
                    { openModal && <FormClient clients={clients} setClients={setClients} setError={setError} /> }
                    { error && <p className="p-1 text-red-500">El DNI ya está en uso.</p> }
                </article>
            </section>

            <section className="flex flex-col items-center justify-start gap-2 bg-white w-full h-96 mt-5 overflow-y-scroll">
                <article className="sticky top-0 z-20 flex justify-center items-center w-full bg-white p-1">
                    <Input setClientName={setClientName} name="search" type="text" placeholder="Buscar cliente" />
                </article>
                <article className="flex flex-col items-center w-72 gap-2">
                    <UserCard handleClientSelected={handleClientSelected} clients={filteredClients} />
                    { clientSelected && <div className="bg-red-500 h-20 w-20">Card</div> }
                </article>
            </section>
        </main>
    )
}

export default Clients;