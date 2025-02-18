import Image from "next/image"

export const DeleteIcon = () => {
    return <Image
    className="cursor-pointer"
    title="Eliminar"
    src="/icons/delete.svg"
    width={24}
    height={24}
    alt="delete icon"
    />
}