"use client"

import { useState } from "react";
import { PlusIcon } from "../components/PlusIcon";
import { FormClient } from "../components/FormClient";

import { UserCard } from "../components/UserCard";
import { Input } from "../components/Input";
import { useAppStore } from "../store/useAppStore";

const Clients = () => {
    const [openModal, setIsOpenModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [error, setError] = useState<{ message: string }[]>([]);
    const clients = useAppStore((state) => state.clients);
    
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
                    { openModal && <FormClient setError={setError} /> }
                    { error.length > 0 ? (
                        error.map((err, i) => (
                            <span className="text-xs w-72 p-1 text-red-500 font-bold" key={i}>{ err.message }</span>
                        ))
                    ) : null }
                </article>
            </section>

            <section className="flex flex-col items-center justify-start gap-2 bg-white w-full h-96 mt-5 overflow-y-scroll">
                <article className="sticky top-0 z-20 flex justify-center items-center w-72 bg-white p-1">
                    <Input setClientName={setClientName} name="search" type="text" placeholder="Buscar cliente" />
                </article>
                <article className="flex flex-col items-center w-72 gap-2">
                    <UserCard clients={filteredClients} />
                </article>
            </section>
        </main>
    )
}

export default Clients;