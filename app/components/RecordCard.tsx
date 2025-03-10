"use client"

import Image from "next/image"
import { useState } from "react"
import { useAppStore } from "../store/useAppStore"

export const RecordCard = () => {
    const loans = useAppStore((state) => state.loans);
    const stock = useAppStore((state) => state.stock);
    const togglePagado = useAppStore((state) => state.togglePagado);
    const updateStock = useAppStore((state) => state.updateStock);
    const [id, setId] = useState<string | null>("");

    const handleOpenOptions = (newId: string) => {
        setId(newId !== id ? newId : null);
    }

    const handleTogglePagado = (id: string, monto: number, pagado: boolean, interes: number) => {
        togglePagado(id);
        const interesCalculado = (interes / 100) * monto;
        if(!pagado) {
            const newStock = stock + (monto + interesCalculado);
            updateStock(newStock);
        }
        else {
            const newStock = stock - (monto + interesCalculado);
            updateStock(newStock);
        }
    }

    const sorted = [...loans].sort((a, b) => b.fecha_emision.getTime() - a.fecha_emision.getTime());

    return (
        <>
        { sorted.length > 0 ? (
            sorted.map(client => (
            
        <article key={client.id_loan} className={`${client.pagado ? "bg-green-300 border-slate-500" : "bg-white"} flex flex-col w-full min-h-16 shadow-sm border-zinc-200 border-[1px] rounded-md`}>
            
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
                <span>Fecha de emisión: <span>{client.fecha_emision.toLocaleDateString("es-AR")}</span></span>
                <span>Fecha de pago: <span>{client.fecha_pago.toLocaleDateString("es-AR")}</span></span>
                <div className="flex items-end justify-between w-full">
                    <button onClick={() => handleTogglePagado(client.id_loan, Number(client.monto_prestamo), client.pagado, Number(client.interes))} className={`${!client.pagado ? "bg-yellow-300" : "bg-green-500 text-white"} p-2 rounded-md`}>
                        {client.pagado ? "Pagado" : "Pendiente"}
                    </button>
                    { +client.cantidad_cuotas == 2 || +client.cantidad_cuotas == 3 ? (

                    <div className="flex flex-col items-center w-24 h-full justify-around">
                        <div className="w-32">
                            <span className="font-semibold">Cuotas pagadas</span>
                        </div>
                            { +client.cantidad_cuotas == 2 ? (
                                <div className="flex items-center w-24 gap-1">
                                    <input name="cuota_1" className="w-6 h-6" type="checkbox" />
                                    <input name="cuota_2" className="w-6 h-6" type="checkbox" />
                                </div>
                            ) : null }
                            { +client.cantidad_cuotas == 3 ? (
                                <div className="flex items-center w-24 gap-1">
                                    <input name="cuota_1" className="w-6 h-6" type="checkbox" />
                                    <input name="cuota_2" className="w-6 h-6" type="checkbox" />
                                    <input name="cuota_3" className="w-6 h-6" type="checkbox" />
                                </div>
                            ) : null }
                    </div>
                    ) : null }

                </div>
            </div>
        </article>
        ))
            
    ) : null }
        </>
    )
}