import Image from "next/image"

export const EditIcon = ({ btnEdit } : { btnEdit: () => void }) => {
    return <Image
    onClick={btnEdit}
    className="cursor-pointer"
    title="Editar"
    src="/icons/edit.svg"
    width={24}
    height={24}
    alt="Edit icon"
    />
}