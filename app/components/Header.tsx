"use client"

import Link from "next/link"
import { WhatsappIcon } from "./WhatsappIcon"
import { usePathname } from "next/navigation";
import { Hamburger } from "./Hamburger";
import { useState } from "react";
import Image from "next/image";
import { Stock } from "./Stock";
import axios from "axios";

const MenuLink = ({ href, text } : { href: string; text: string }) => {
    const pathname = usePathname();

    return (
        <Link className={`${ pathname === href ? "text-[#3648f5]" : "bg-white"}`} href={ href }>{ text }</Link>
    )
}

const AsideMenu = () => {

    const handleLogout = async() => {
        try {
            const res = await axios.post("/api/auth/logout")
            if(res) {
                window.location.href = "/login"
            }
        }
        catch(err) {
            console.log("Error", err);
        }
    }

    return (
        <aside className="flex flex-col bg-white absolute top-0 left-0 w-full md:w-72 h-[100vh] z-40">
            <ul className="mt-10 w-56 h-96 flex flex-col justify-around p-2 font-semibold text-xl">
                <MenuLink href="/dashboard" text="Inicio" />
                <MenuLink href="/clients" text="Clientes" />
                <MenuLink href="/clients/deal" text="Préstamos" />
                <MenuLink href="#" text="Configuración" />
                <button className="text-start" onClick={handleLogout}>Cerrar sesión</button>
            </ul>
        </aside>
    )
}

export const Header = () => {
    
    const path = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [openStock, setIsOpenStock] = useState(false);

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleOpenStock = () => {
        setIsOpenStock(prev => !prev);
    }
    
    return (
        <header className="fixed w-full -mt-12 z-50 bg-white flex justify-around items-center min-h-12 border-b-2 border-b-zinc-200">
            
            {isOpen ? <AsideMenu /> : null}
            {path !== "/" && path !== "/login" ? (
                <>
                <Hamburger styles={isOpen ? "rotate-90" : ""} handleOpenMenu={handleOpenMenu} />
                <div className="absolute right-5 flex flex-col items-center">
                    <Image onClick={handleOpenStock} className="w-5 cursor-pointer" src="/icons/dollar.png" width={24} height={24} alt="dollar icon" />
                    {openStock && <Stock />}
                </div>
                </>
            ) : (
            <>
            <div className="flex absolute left-7 md:left-20">
                <WhatsappIcon />
            </div>
            <button className="w-20 right-2 md:block absolute text-xs md:text-sm md:w-36 border-[1px] border-zinc-300 text-white bg-[#3648f5] hover:bg-[#2a37d8] font-semibold p-2 md:right-5 rounded-md min-h-8">
                <a href="https://wa.me/+5491164955967/?text=Quisiera%20más%20información%20sobre%20los%20préstamos.%20Gracias!">
                Consultar
                </a>
            </button>
            </>
            )}

            <Link className="font-bold text-lg tracking-wide text-[#2a37d8]" href="/dashboard">Prestamón</Link>
        </header>
    )
}