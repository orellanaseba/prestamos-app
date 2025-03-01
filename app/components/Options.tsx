"use client"
import { DeleteIcon } from "./DeleteIcon"
import { EditIcon } from "./EditIcon"
import { useAppStore } from "../store/useAppStore"

export const Options = ({ id } : { id: string; }) => {
    const deleteClient = useAppStore((state) => state.deleteClient);

    const handleBtnDelete = () => {
        const confirmarDelete = confirm("¿Seguro quieres eliminar este cliente?")
        if(confirmarDelete) {
            deleteClient(id);
        }
    }

    return (
        <div className="z-20 bg-white border-[1px] border-zinc-300 absolute right-0 top-7 flex flex-col justify-around items-center w-12 min-h-14 rounded-md">
            <EditIcon />
            <DeleteIcon btnDelete={handleBtnDelete} />
        </div>
    )
}