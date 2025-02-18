"use client"

import { Client } from "../types"
import { DotsIcon } from "./DotsIcon";
// import { Options } from "./Options";

interface ClientProps {
    clients: Client[];
}

export const UserCard = ({ clients }: ClientProps) => {
    
    // Arreglar el botón "options";
    
    return (
        <>
        { clients.length > 0 ? (
        clients.map(client => (

        <article key={ client.dni } className="bg-white flex flex-col w-full min-h-16 shadow-sm border-zinc-200 border-[1px] relative">
            <div className="flex flex-col justify-around font-semibold overflow-x-hidden">
                <div className="flex justify-around items-center text-xs uppercase min-h-8 relative">
                    <span>Nombre</span>
                    <span>DNI</span>
                    <DotsIcon />
                </div>
                {/* { openOptions && <Options /> } */}

                <div className="flex justify-around items-center p-1">
                    <span title={ client.nombre } className="max-w-32 text-xs overflow-hidden text-ellipsis font-semibold">{ client.nombre }</span>
                    <span className="font-semibold text-xs">{ client.dni }</span>
                </div>
            </div>
        </article>
        ))
    ) : <p>No hay clientes.</p> }
        </>

    )
}