import { Button } from "./Button"
import { Input } from "./Input"
import { Client } from "../types"

export const FormClient = 
    ({ clients, setClients, setError }
    : 
    { clients: Client[]; setClients: (data: Client[]) => void; setError: (error: boolean) => void; }) => {
    
    const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get("nombre") as string,
            dni: formData.get("dni") as string,
            email: formData.get("email") as string,
            numero_telefono: formData.get("numero_telefono") as string
        };
        
        const matchDni = clients.find(client => {
            return client.dni === data.dni;
        })

        if(matchDni) {
            setError(true)
            console.log(matchDni);
        }
        else {
            setError(false);
            const newItem = [...clients, data]
            localStorage.setItem("clients", JSON.stringify(newItem))
            setClients(newItem)
        }
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