import Image from "next/image"

export const PlusIcon = ({ handleOpenModal } : { handleOpenModal: () => void }) => {
    return <Image
    onClick={handleOpenModal}
    className="cursor-pointer absolute right-5"
    title="Agregar cliente"
    src="/icons/plus.svg"
    width={24}
    height={24}
    alt="Plus icon"
    />
}