"use client"

import Image from "next/image"
import React, { useState } from "react"
import { useAppStore } from "../store/useAppStore"

export const RecordCard = () => {
    const loans = useAppStore((state) => state.loans);
    const stock = useAppStore((state) => state.stock);
    const togglePagado = useAppStore((state) => state.togglePagado);
    const updateStock = useAppStore((state) => state.updateStock);
    const deleteLoan = useAppStore((state) => state.deleteLoan);
    const addHistory = useAppStore((state) => state.addHistory);
    const [id, setId] = useState<string | null>("");
    const updateCuotasPagadas = useAppStore((state) => state.updateCuotasPagadas);

    const handleOpenOptions = (newId: string) => {
        setId(newId !== id ? newId : null);
    }

    const handleCuotaPagada = (loanId: string, cuotaIndex: number) => {
        const loan = loans.find((loan) => loan.id_loan === loanId);
        if (loan) {
            const nuevasCuotas = [...loan.cuotas_pagadas];
            if(nuevasCuotas[cuotaIndex] > 0) {
                nuevasCuotas[cuotaIndex] = 0;
                updateStock(stock - loan.monto_cuotas);
            }
            else {
                nuevasCuotas[cuotaIndex] = loan.monto_cuotas;
                updateStock(stock + loan.monto_cuotas)
            }
            updateCuotasPagadas(loanId, nuevasCuotas);
        }
    };

    const handleTogglePagado = (id: string, monto: number, pagado: boolean, interes: number) => {
        const findLoan = loans.find(l => l.id_loan === id);

        if(findLoan?.cuotas_pagadas.every(l => l > 0)) {
            togglePagado(id);
            return;
        }

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


    const handleDeleteLoan = (loanId: string) => {
        const match = sorted.find(loan => loan.id_loan === loanId);
        if(match) {
            addHistory(match);
            deleteLoan(loanId);
        }
    }

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
                    <span title={client.nombre_cliente} className="max-w-32 text-xs overflow-hidden text-ellipsis font-semibold">{client.nombre_cliente}</span>
                    <span className="font-semibold text-xs">{client.dni_cliente}</span>
                </div>
            </div>
            <div className={`${id === client.id_loan ? "flex bg-zinc-50" : "hidden"} flex-col justify-around items-start gap-2 p-2 font-semibold text-xs min-h-20`}>
                <span>Monto: <span>${client.monto_prestamo.toLocaleString("es-AR")}</span></span>
                <span>Interés: <span>{ client.interes }%</span></span>
                <span>Cantidad de cuotas: <span>{client.cantidad_cuotas}</span></span>
                {client.cantidad_cuotas > 1 ? <span>Monto de cuotas: <span>${client.monto_cuotas.toLocaleString("es-AR")}</span></span> : null}
                {client.cantidad_cuotas == 2 ? (
                    <div className="flex items-center gap-1">
                        <span>Cuotas pagadas: </span>
                        {Array.from({ length: client.cantidad_cuotas }).map((_, index) => (
                            <input
                                key={index}
                                onChange={() => handleCuotaPagada(client.id_loan, index)}
                                checked={client.cuotas_pagadas[index] > 0}
                                className="h-4 w-4"
                                type="checkbox"
                            />
                        ))}
                    </div>
                ) : client.cantidad_cuotas == 3 ? (
                    <div className="flex items-center gap-1">
                        <span>Cuotas pagadas: </span>
                        {Array.from({ length: client.cantidad_cuotas }).map((_, index) => (
                            <input
                                key={index}
                                onChange={() => handleCuotaPagada(client.id_loan, index)}
                                checked={client.cuotas_pagadas[index] > 0}
                                className="h-4 w-4"
                                type="checkbox"
                            />
                        ))}
                    </div>
                ) : null}
                <span>Fecha de emisión: <span>{client.fecha_emision.toLocaleDateString("es-AR")}</span></span>
                <span>Fecha final de pago: <span>{client.fecha_pago.toLocaleDateString("es-AR")}</span></span>
                <span>Período de pago: <span>{client.periodo_pago}</span></span>
                <div className="flex items-end justify-between w-full">
                    <button
                    disabled={client.cantidad_cuotas > 1 && !client.cuotas_pagadas.every(cuota => cuota)}
                    onClick={() => handleTogglePagado(client.id_loan, client.monto_prestamo, client.pagado, client.interes)} className={`${!client.pagado ? "bg-yellow-300" : "bg-green-300"} border-[1px] shadow-sm border-zinc-200 p-2 rounded-md`}>
                        {client.pagado ? "Pagado" : "Pendiente"}
                    </button>
                    <button
                    className={`${client.pagado ? "block bg-red-400 border-[1px] shadow-sm border-zinc-200 p-2 rounded-md" : "hidden"}`}
                    onClick={() => handleDeleteLoan(client.id_loan)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
        ))
            
    ) : null }
        </>
    )
}