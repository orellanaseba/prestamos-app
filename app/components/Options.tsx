"use client"
import { DeleteIcon } from "./DeleteIcon"
import { EditIcon } from "./EditIcon"
import { useAppStore } from "../store/useAppStore"
import { useState } from "react"
import { Button } from "./Button"
import { Client } from "../types"
import { clientSchema } from "../schemas/clientSchema"
import { ZodError } from "zod"

export const Options = ({ id } : { id: string; }) => {
    const [error, setError] = useState<{ message: string }[]>([]);
    const clients = useAppStore((state) => state.clients);
    const deleteClient = useAppStore((state) => state.deleteClient);
    const updateClient = useAppStore((state) => state.updateClient);
    const [editModal, setEditModal] = useState(false);
    const [data, setData] = useState<Client>()
    const STYLES = "p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs";

    const handleBtnDelete = () => {
        const confirmarDelete = confirm("¿Seguro quieres eliminar este cliente?")
        if(confirmarDelete) {
            deleteClient(id);
        }
    }

    const handleBtnEdit = () => {
        const clientFounded = clients.find(client => client.id_cliente === id);
        if(clientFounded) {
            setData(clientFounded);
            setEditModal(prev => !prev);
        }
    }

    const handleEditForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const dataForm = {
            ...data,
            nombre: formData.get("nombre") as string,
            dni: formData.get("dni") as string,
            email: formData.get("email") as string,
            numero_telefono: formData.get("numero_telefono") as string,
        }

    const dniChanged = data?.dni !== dataForm.dni;
    const emailChanged = data?.email !== dataForm.email;

    // Verificar si el nuevo DNI o email ya están en uso
    const matchDni = dniChanged && clients.find(client => client.dni === dataForm.dni);
    const matchEmail = emailChanged && clients.find(client => client.email === dataForm.email);
                
        try {
            const validateData = clientSchema.parse(dataForm);

            if(matchDni) {
                alert("El DNI ya está en uso.")
                return;
            }

            if(matchEmail) {
                alert("El email ya está en uso.")
                return;
            }
            
            if(validateData) {
                setError([]);
                updateClient(dataForm);
                setEditModal(false)
                console.log(dataForm);
            }
        
        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.errors.map(err => ({ message: err.message })));
            } else if (error instanceof Error) {
                setError([{ message: error.message }]);
            }
        }

    }

    return (
        <>
        <div className="z-20 bg-white border-[1px] border-zinc-300 absolute right-0 top-7 flex flex-col justify-around items-center w-12 min-h-14 rounded-md">
            <EditIcon btnEdit={handleBtnEdit} />
            <DeleteIcon btnDelete={handleBtnDelete} />
        </div>

        <form onSubmit={handleEditForm} className={`${editModal ? "absolute flex flex-col justify-evenly bg-white w-72 min-h-32 gap-2 top-0 z-10 p-1" : "hidden"}`}>
            <input name="nombre" defaultValue={data && data.nombre} className={STYLES} type="text" placeholder="Nombre" />
            <input name="dni" defaultValue={data && data.dni} className={STYLES} type="number" placeholder="DNI" />
            <input name="email" defaultValue={data && data.email} className={STYLES} type="email" placeholder="Correo electrónico" />
            <input name="numero_telefono" defaultValue={data && data.numero_telefono} className={STYLES} type="number" placeholder="Nro. Teléfono" />
            <Button text="Actualizar" />
            <div className={`${error.length > 0 ? "flex" : "hidden"} min-h-20 flex-col`}>
            { error.length > 0 ? (
                error.map((err, i) => (
                    <span className="text-xs w-72 p-1 text-red-500 font-bold" key={i}>{ err.message }</span>
                ))
            ) : null }
            </div>
        </form>
        </>
    )
}