import Link from "next/link"
import { WhatsappIcon } from "./WhatsappIcon"

export const Header = () => {
    return (
        <header className="fixed w-full -mt-12 z-50 bg-white flex justify-around items-center min-h-12 border-b-2 border-b-zinc-200">
            <div className="flex absolute left-7 md:left-20">
                <WhatsappIcon />
            </div>
            <Link className="font-bold text-lg tracking-wide text-[#2a37d8]" href="#">Prestamón</Link>
            <button className="w-20 right-2 md:block absolute text-xs md:text-sm md:w-36 border-[1px] border-zinc-300 text-white bg-[#3648f5] hover:bg-[#2a37d8] font-semibold p-2 md:right-5 rounded-md min-h-8">
                <a href="https://wa.me/+5491164955967/?text=Quisiera%20más%20información%20sobre%20los%20préstamos.%20Gracias!">
                Consultar
                </a>
                </button>
        </header>
    )
}