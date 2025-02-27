"use client"

import { Client } from "@/app/types";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useAppStore } from "@/app/store/useAppStore";
import { loanSchema } from "@/app/schemas/clientSchema";
import { useState } from "react";
import { ZodError } from "zod";

const Deal = () => {
    const newLoan = useAppStore((state) => state.newLoan);
    const [error, setError] = useState<{ message: string }[]>([]);
    const stock = useAppStore((state) => state.stock);
    const updateStock = useAppStore((state) => state.updateStock);
    const [success, setSuccess] = useState("");
    const [total, setTotal] = useState(0);

    const clients = useAppStore((state) => state.clients);
    const STYLES = "p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"

    const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dni_cliente = formData.get("dni_cliente") as string;
        const client = clients.find(client => client.dni === dni_cliente)
        
        const interes = formData.get("interes") as string;
        const monto_prestamo = formData.get("monto_prestamo") as string;

        const porcentajeInteres = Number(interes)/100;
        const agregarInteres = porcentajeInteres * Number(monto_prestamo);

        const newStock = stock - (Number(monto_prestamo) + porcentajeInteres);
        
        const fecha_emision = new Date(formData.get("fecha_emision") as string);
        const fecha_pago = new Date(formData.get("fecha_pago") as string);

        const data = {
            id_loan: crypto.randomUUID(),
            nombre_cliente: client ? client.nombre : "",
            monto_prestamo: formData.get("monto_prestamo") as string,
            cantidad_cuotas: formData.get("cantidad_cuotas") as string,
            interes: interes ? interes : "0",
            dni_cliente: formData.get("dni_cliente") as string,
            fecha_emision: fecha_emision,
            fecha_pago: fecha_pago,
            pagado: false,
        }

        try {
            const validateData = loanSchema.parse(data);

            if(+monto_prestamo > stock) {
                alert("El monto es mayor que el stock.");
                return;
            }

            if(validateData && clients.length > 0) {
                setError([]);
                newLoan(data);
                console.log(data);
                updateStock(newStock);
                setTotal(Number(monto_prestamo) + Math.floor(agregarInteres));
                setSuccess("Préstamo otorgado correctamente.");
            }
        }
        catch(error) {
            if(error instanceof ZodError) {
                setError(error.errors.map(err => ({ message: err.message })));
            }
        }

    }    

    return (
        <main className="flex flex-col items-center min-h-96 w-full">
            <form onSubmit={handleFormData} className="flex flex-col items-center mt-2 gap-2 bg-white w-72 rounded-md border-[1px] border-zinc-300 p-2">
            <span className="text-center font-semibold">Nuevo préstamo</span>
            <input className={STYLES} name="monto_prestamo" type="number" placeholder="Monto del préstamo" min={1000} />
            <select name="cantidad_cuotas" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                <option disabled defaultValue="Cantidad de cuotas">Cantidad de cuotas</option>
                <option value="1">Pago único</option>
                <option value="2">Dos cuotas</option>
                <option value="3">Tres cuotas</option>
            </select>
            <input className={STYLES} name="interes" type="number" placeholder="Porcentaje de interés" min={0} max={100} />
            <select name="dni_cliente" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                    <option disabled defaultValue="Seleccionar cliente">{clients.length > 0 ? "Seleccionar cliente" : "No hay clientes disponibles"}</option>
                {clients.length > 0 ? (clients.map((client: Client) => (
                    <option key={client.dni} value={`${client.dni}`}>{client.nombre} - {client.dni}</option>
                ))
                ) : null}
            </select>
            <div className="flex flex-col justify-start w-full">
                <span>Fecha de emisión</span>
                <Input name="fecha_emision" type="date" placeholder="" />
                <span>Fecha de pago</span>
                <Input name="fecha_pago" type="date" placeholder="" />
            </div>

            <div className="flex flex-col items-start justify-start w-full p-1">
                { error.length > 0 ? (
                    error.map((err, i) => (
                        <span className="text-red-500 font-bold text-xs" key={i}>{ err.message }</span>
                    ))
                ) : <span className="text-xs text-green-400 font-bold">{success}</span> }
                <span>Total: <span>${total ? total.toLocaleString("es-AR") : 0}</span></span>
            </div>

            <Button text="Otorgar préstamo" />
            </form>
        </main>
    )
}

export default Deal;