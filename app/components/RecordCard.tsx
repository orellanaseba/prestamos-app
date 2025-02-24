"use client"

import Image from "next/image"
import { useState } from "react"
import { useAppStore } from "../store/useAppStore"

export const RecordCard = () => {
    const loans = useAppStore((state) => state.loans);
    const [id, setId] = useState<string | null>("");

    const handleOpenOptions = (newId: string) => {
        setId(newId !== id ? newId : null);
    }

    return (
        <>
        { loans.length > 0 ? (
            loans.map(client => (
        <article key={client.id_loan} className="bg-white flex flex-col w-full min-h-16 shadow-sm border-zinc-200 border-[1px]">
            
            <div className="flex flex-col justify-around font-semibold overflow-x-hidden">
                <div className="flex justify-around items-center text-xs uppercase min-h-8 relative">
                    <span>Nombre</span>
                    <span>DNI</span>
                    <Image onClick={() => handleOpenOptions(client.id_loan)} className={`${id === client.id_loan ? "rotate-180" : ""} w-5 absolute right-5`} src="/icons/arrow-down.png" width={48} height={48} alt="arrow down icon" />
                </div>
                <div className="flex justify-around items-center p-1">
                    <span title="Sebastián Orellana" className="max-w-32 text-xs overflow-hidden text-ellipsis font-semibold">{client.nombre_cliente}</span>
                    <span className="font-semibold text-xs">{client.dni_cliente}</span>
                </div>
            </div>
            <div className={`${id === client.id_loan ? "flex bg-zinc-50" : "hidden"} flex-col justify-around items-start gap-2 p-1 font-semibold text-xs min-h-20`}>
                <span>Monto: <span>${Number(client.monto_prestamo).toLocaleString("es-AR")}</span></span>
                <span>Interés: <span>{ client.interes }%</span></span>
                <span>Cantidad de cuotas: <span>{client.cantidad_cuotas}</span></span>
                <span>Fecha de emisión: <span>{client.fecha_emision}</span></span>
                <span>Fecha de pago: <span>{client.fecha_pago}</span></span>
                <button className="bg-yellow-300 p-2 rounded-md">Pendiente</button>
            </div>
        </article>
        ))
            
    ) : null }
        </>
    )
}