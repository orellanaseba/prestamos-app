import Image from "next/image"

export const Hamburger = ({ handleOpenMenu, styles } : { handleOpenMenu: () => void; styles: string }) => {
    return <Image
    onClick={handleOpenMenu}
    className={`${styles} transition-all duration-200 absolute left-5 z-40 cursor-pointer`}
    src="/icons/hamburger.svg"
    width={24}
    height={24}
    alt="Hambuger icon"
    />
}