import React from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Client } from "../types"

export const FormClient = ({ clients, setClients }: { clients: Client[]; setClients: (data: Client[]) => void }) => {
    const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get("nombre") as string,
            dni: formData.get("dni") as string,
            email: formData.get("email") as string,
            numero_telefono: formData.get("numero_telefono") as string
        };
        setClients([
            ...clients,
            data
        ])
    }

    return (
        <form onSubmit={handleFormData} className="flex flex-col items-center p-1 gap-2 w-72 min-h-32">
            <Input name="nombre" type="text" placeholder="Nombre y apellido del cliente" />
            <Input name="dni" type="number" placeholder="DNI" />
            <Input name="email" type="email" placeholder="Correo electrónico" />
            <Input name="numero_telefono" type="number" placeholder="Número telefónico" />
            <Button text="Agregar" />
        </form>
    )
}