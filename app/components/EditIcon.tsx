import Image from "next/image"

export const EditIcon = () => {
    return <Image
    className="cursor-pointer"
    title="Editar"
    src="/icons/edit.svg"
    width={24}
    height={24}
    alt="Edit icon"
    />
}