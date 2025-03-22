"use client";

import { useParams } from "next/navigation";
import { useAppStore } from "../../store/useAppStore";
import { useEffect, useState } from "react";
import { Client, Loan } from "@/app/types";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";

const Record = () => {
    const { id_cliente } = useParams();
    const clients = useAppStore((state) => state.clients);
    const [client, setClient] = useState<Client | undefined>();
    const [foundHistory, setHistory] = useState<Loan[] | undefined>();
    const [id, setId] = useState<string | null>("");
    const history = useAppStore((state) => state.history);
    const [open, setOpen] = useState(false);
    const deleteHistory = useAppStore((state) => state.deleteHistory);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const foundClient = clients.find(client => client.id_cliente === id_cliente);
        setClient(foundClient);

        const foundLoans = history.filter(loan => loan.id_cliente === id_cliente && loan.pagado === true);
        setHistory(foundLoans);
    }, [id_cliente, clients, history])


    const handleOpen = (newId: string) => {
        setId(newId !== id ? newId : null);
    }

    const handleOpenInfo = () => {
        setOpen(prev => !prev);
    }

    if(!clients) return <p>No hay clientes</p>

    if(!isAuthenticated) return null;

    return (
        <section className="flex flex-col items-center">

        <div className="flex justify-around items-center p-1 w-72 bg-white shadow-sm rounded-md min-h-10 mb-2 mt-5">
            <h1 className="font-semibold">Historial</h1>
        </div>

        <section className="w-72 bg-white shadow-sm rounded-md p-1">
            <div className="flex justify-between p-1">
                <h1 className="text-center font-semibold">Información general</h1>
                <Image className={`${open ? "rotate-180" : ""}`} onClick={handleOpenInfo} src="/icons/arrow-down.png" alt="arrow down icon" width={24} height={24}  />
            </div>
            <div className={`${open ? "flex" : "hidden"} flex-col w-full gap-1`}>
            <hr className="m-2" />
                {client && (
                    <>
                        <span className="font-medium">Nombre: <span>{client.nombre}</span></span>
                        <span className="font-medium">DNI: <span>{client.dni}</span></span>
                        <span className="font-medium">Email: <span>{client.email}</span></span>
                        <span className="font-medium">Nro. Teléfono: <span>{client.numero_telefono}</span></span>
                    </>
                )}
            </div>
        </section>

        <div className={`${foundHistory && foundHistory.length > 0 ? "overflow-y-scroll" : ""} w-72 h-96  mt-2 flex flex-col items-center mx-auto gap-2`}>
                { foundHistory && foundHistory.length > 0 ? (
                    foundHistory.map(client => (
                <article key={client.id_loan} className="flex flex-col w-full min-h-16 shadow-sm bg-white border-zinc-200 border-[1px] rounded-md">
                    
                    <div className="flex flex-col justify-around font-semibold overflow-x-hidden">
                        <div className="flex justify-around items-center text-xs uppercase min-h-8 relative">
                            <span>Nombre</span>
                            <span>DNI</span>
                            <Image onClick={() => handleOpen(client.id_loan)} className={`${ id === client.id_loan ? "rotate-180" : ""} w-5 absolute right-5`} src="/icons/arrow-down.png" width={48} height={48} alt="arrow down icon" />
                        </div>
                        <div className="flex justify-around items-center p-1">
                            <span title={client.nombre_cliente} className="max-w-32 text-xs overflow-hidden text-ellipsis font-semibold">{client.nombre_cliente}</span>
                            <span className="font-semibold text-xs">{client.dni_cliente}</span>
                        </div>
                    </div>
                    <div className={`${id === client.id_loan ? "flex bg-zinc-50" : "hidden"} flex-col justify-around items-start gap-2 p-2 font-semibold text-xs min-h-20`}>
                        <span>Monto: <span>${client.monto_prestamo.toLocaleString("es-AR")}</span></span>
                        <span>Interés: <span>{ client.interes }%</span></span>
                        <span>Cantidad de cuotas: <span>{client.cantidad_cuotas}</span></span>
                        <span>Fecha de emisión: <span>{client.fecha_emision.toLocaleDateString("es-AR")}</span></span>
                        <span>Fecha final de pago: <span>{client.fecha_pago.toLocaleDateString("es-AR")}</span></span>
                        <span>Fecha final de pago: <span>{client.periodo_pago}</span></span>
                        <span>¿Pagado? <span>{client.pagado ? "Pagado" : "Pendiente"}</span></span>
                        <button
                        onClick={() => deleteHistory(client.id_loan)}
                        className={`${client.pagado ? "block bg-red-400 border-[1px] shadow-sm border-zinc-200 p-2 rounded-md" : "hidden"}`}
                        >
                        Eliminar
                    </button>
                    </div>
                </article>
                ))
                    
            ) : <p className="mt-2">No hay préstamos emitidos.</p> }
        </div>

        </section>
    )
}

export default Record;