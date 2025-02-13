import { HamburgerIcon } from "./HamburguerIcon"

export const Header = () => {
    return (
        <header className="flex justify-center items-center min-h-12 relative border-b-2 border-b-zinc-200">
            <HamburgerIcon />
            <a className="font-bold text-lg tracking-wide text-[#2a37d8]" href="#">Prestamón</a>
            <nav className="hidden md:flex bg-red-500">
                <ul>
                    <li>Pedir un prestamo</li>
                    <li>Contacto</li>
                </ul>
            </nav>
            <div className="hidden md:flex">
                <a href="#">Registrarse</a>
                <a href="#">Iniciar sesión</a>
            </div>
        </header>
    )
}