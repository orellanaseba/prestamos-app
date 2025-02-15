import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="absolute bottom-0 min-h-12 flex justify-center items-center bg-black text-white w-full">
            <Link className="font-semibold" href="/">Prestamón</Link>
        </footer>
    )
}