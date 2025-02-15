"use client";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
    title: string;
    description: string;
}

export const Card = ({ title, description } : CardProps) => {
    return (
        <article className="flex flex-col justify-around w-72 min-h-20 bg-zinc-100 border-[1px] border-zinc-300 text-black p-2 rounded-md shadow-lg">
            <span className="font-semibold md:text-lg">{ title }</span>
            <hr className="w-full bg-zinc-300" />
            <p className="text-xs font-medium md:text-sm">{ description }</p>
        </article>
    )
}

export const Accordeon = ({ title, description } : CardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <article className="flex flex-col justify-start w-72 min-h-20 bg-zinc-100 border-[1px] border-zinc-300 text-black p-2 rounded-md shadow-lg">
            <div className="flex justify-around items-start min-h-10">
                <span className="font-semibold md:text-lg">{ title }</span>
                <Image className={`${isOpen ? "rotate-180" : ""}`} onClick={handleOpenMenu} src="/icons/arrow-down.png" width={48} height={48} alt="arrow down icon" />
            </div>
            <hr className={`${isOpen ? "block" : "hidden"} w-full bg-zinc-300`} />
            <div className={`${isOpen ? "flex" : "hidden"} justify-center flex-col items-start h-14`}>
                <p className={`${isOpen ? "block" : "hidden"} text-xs font-medium md:text-sm`}>{ description }</p>
            </div>
        </article>
    )
}