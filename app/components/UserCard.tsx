"use client"

import { useState } from "react";
import { Client } from "../types"
import { DotsIcon } from "./DotsIcon";
import { Options } from "./Options";
import Link from "next/link";
import { ProfileIcon } from "./ProfileIcon";

interface ClientProps {
    clients: Client[];
}

export const UserCard = ({ clients }: ClientProps) => {
    const [id, setId] = useState<string | null>("");

    const handleOpenOptions = (newId: string) => {
        setId(newId !== id ? newId : null);
    }
    
    return (
        <>
        { clients.length > 0 ? (
        clients.map(client => (
        <article
        key={ client.id_cliente }
        className="bg-white flex flex-col w-full min-h-16 shadow-sm border-zinc-200 border-[1px] relative rounded-md">
            <div className="flex flex-col justify-around font-semibold overflow-x-hidden">
                <div className="flex justify-around items-center text-xs uppercase min-h-8 relative">
                    <Link className="absolute left-1" href={`/record/${client.id_cliente}/`}><ProfileIcon /></Link>
                    <span>Nombre</span>
                    <span>DNI</span>
                    <DotsIcon setId={() => client.id_cliente && handleOpenOptions(client.id_cliente)} />
                </div>
                { id === client.id_cliente && <Options id={id} /> }

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