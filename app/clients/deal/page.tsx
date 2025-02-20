"use client"

import { Client } from "@/app/types";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useAppStore } from "@/app/store/useAppStore";

const Deal = () => {

    const clients = useAppStore((state) => state.clients);

    // const styles = "p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"

    console.log("DEAL CLIENTS:", clients);

    return (
        <main className="flex flex-col items-center min-h-96 w-full">
            <section className="flex flex-col items-center mt-2 gap-2 bg-white w-72 rounded-md border-[1px] border-zinc-300 p-2">
            <span className="text-center">Nuevo préstamo</span>
            <input name="monto_prestamo" type="number" placeholder="Monto del préstamo" />
            <select name="prestamo_datos" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                <option defaultValue="Cantidad de cuotas">Cantidad de cuotas</option>
                <option value="pago_unico">Pago único</option>
                <option value="dos_cuotas">Dos cuotas</option>
                <option value="tres_cuotas">Tres cuotas (incluye interés)</option>
            </select>
            <Input name="interes" type="number" placeholder="Porcentaje de interés" />
            <select name="clients" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                    <option defaultValue="Seleccionar cliente">{clients.length > 0 ? "Seleccionar cliente" : "No hay clientes disponibles"}</option>
                {clients.length > 0 ? (clients.map((client: Client) => (
                    <option key={client.dni} value={client.dni}>{client.nombre} - {client.dni}</option>
                ))
                ) : null}
            </select>
            <div className="flex flex-col justify-start w-full">
                <span>Fecha de emisión</span>
                <Input name="fecha_emision" type="date" placeholder="" />
                <span>Fecha de pago</span>
                <Input name="fecha_pago" type="date" placeholder="" />
            </div>

            <Button text="Otorgar préstamo" />
            </section>
        </main>
    )
}

export default Deal;