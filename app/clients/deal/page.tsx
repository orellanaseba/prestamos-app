"use client"

import { Client } from "@/app/types";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useAppStore } from "@/app/store/useAppStore";

const Deal = () => {
    // const loans = useAppStore((state) => state.loans);
    // const newLoan = useAppStore((state) => state.newLoan);

    const clients = useAppStore((state) => state.clients);
    const STYLES = "p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"

    const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            monto_prestamo: formData.get("monto_prestamo") as string,
            cantidad_cuotas: formData.get("cantidad_cuotas") as string,
            interes: formData.get("interes") as string,
            nombre_cliente: formData.get("nombre_cliente") as string,
            fecha_emision: formData.get("fecha_emision") as string,
            fecha_pago: formData.get("fecha_pago") as string,
        }

        console.log(data);

    }

    return (
        <main className="flex flex-col items-center min-h-96 w-full">
            <form onSubmit={handleFormData} className="flex flex-col items-center mt-2 gap-2 bg-white w-72 rounded-md border-[1px] border-zinc-300 p-2">
            <span className="text-center font-semibold">Nuevo préstamo</span>
            <input className={STYLES} name="monto_prestamo" type="number" placeholder="Monto del préstamo" min={0} max={100000} required />
            <select name="cantidad_cuotas" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                <option disabled defaultValue="Cantidad de cuotas">Cantidad de cuotas</option>
                <option value="1">Pago único</option>
                <option value="2">Dos cuotas</option>
                <option value="3">Tres cuotas (incluye interés)</option>
            </select>
            <input className={STYLES} name="interes" type="number" placeholder="Porcentaje de interés" min={0} max={100} required />
            <select name="nombre_cliente" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                    <option disabled={true} defaultValue="Seleccionar cliente">{clients.length > 0 ? "Seleccionar cliente" : "No hay clientes disponibles"}</option>
                {clients.length > 0 ? (clients.map((client: Client) => (
                    <option key={client.dni} value={client.nombre}>{client.nombre} - {client.dni}</option>
                ))
                ) : null}
            </select>
            <div className="flex flex-col justify-start w-full">
                <span>Fecha de emisión</span>
                <Input name="fecha_emision" type="date" placeholder="" />
                <span>Fecha de pago</span>
                <Input name="fecha_pago" type="date" placeholder="" />
            </div>

            <div className="flex items-center justify-start w-full p-1 bg-zinc-200 rounded-md">
                <span>Préstamo: 2000 + <span>10%</span></span>
            </div>

            <Button text="Otorgar préstamo" />
            </form>
        </main>
    )
}

export default Deal;