"use client"

import Image from "next/image"
import { useState } from "react"

export const RecordCard = () => {
    const [openCard, setIsOpenCard] = useState(false)

    const handleOpenCard = () => {
        setIsOpenCard(!openCard);
    }

    return (
        <article className="bg-white flex flex-col w-full min-h-16 shadow-sm border-zinc-200 border-[1px]">
            <div className="flex flex-col justify-around font-semibold overflow-x-hidden">
                <div className="flex justify-around items-center text-xs uppercase min-h-8 relative">
                    <span>Nombre</span>
                    <span>DNI</span>
                    <Image onClick={handleOpenCard} className={`${openCard ? "rotate-180" : ""} w-5 absolute right-5`} src="/icons/arrow-down.png" width={48} height={48} alt="arrow down icon" />
                </div>
                <div className="flex justify-around items-center p-1">
                    <span title="Sebastián Orellana" className="max-w-32 text-xs overflow-hidden text-ellipsis font-semibold">Sebastián Orellana</span>
                    <span className="font-semibold text-xs">10203040</span>
                </div>
            </div>
            <div className={`${openCard ? "flex bg-zinc-50" : "hidden"} flex-col justify-around items-start gap-2 p-1 font-semibold text-xs h-20`}>
                <span>Monto: <span>10.000</span></span>
                <span>Cantidad de cuotas: <span>3 con interés</span></span>
                <span>Fecha: 15-02-2025</span>
            </div>
        </article>
    )
}