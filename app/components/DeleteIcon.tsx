import Image from "next/image"

export const DeleteIcon = ({ btnDelete } : { btnDelete: () => void; }) => {
    return <Image
    onClick={btnDelete}
    className="cursor-pointer"
    title="Eliminar"
    src="/icons/delete.svg"
    width={24}
    height={24}
    alt="delete icon"
    />
}