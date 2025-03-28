"use client"

import { Client } from "@/app/types";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useAppStore } from "@/app/store/useAppStore";
import { loanSchema } from "@/app/schemas/clientSchema";
import { useState } from "react";
import { ZodError } from "zod";
import { useAuth } from "@/app/hooks/useAuth";
import { createLoan, updateStockDb } from "@/app/api/queries/queries";

const Deal = () => {
    const newLoan = useAppStore((state) => state.newLoan);
    const [error, setError] = useState<{ message: string }[]>([]);
    const stock = useAppStore((state) => state.stock);
    const updateStock = useAppStore((state) => state.updateStock);
    const [success, setSuccess] = useState("");
    const [total, setTotal] = useState(0);
    const [, setSelectedOption] = useState("");
    const clients = useAppStore((state) => state.clients);
    const STYLES = "p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"

    const handleChangeCuota = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    } 

    const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const id_cliente = formData.get("id_cliente") as string;
        const client = clients.find(client => client.id_cliente === id_cliente)
        
        const interes = Number(formData.get("interes"));
        const monto_prestamo = Number(formData.get("monto_prestamo"));

        const porcentajeInteres = interes/100;
        const agregarInteres = porcentajeInteres * monto_prestamo;

        const newStock = stock - (monto_prestamo + porcentajeInteres);
        
        const fecha_emision = new Date(formData.get("fecha_emision") as string + "T00:00:00");
        const fecha_pago = new Date(formData.get("fecha_pago") as string + "T00:00:00");

        const cantidad_cuotas = formData.get("cantidad_cuotas");
        const monto_cuotas = Math.round((agregarInteres + monto_prestamo) / Number(cantidad_cuotas));

        const data = {
            id_loan: crypto.randomUUID(),
            id_cliente: id_cliente,
            nombre_cliente: client ? client.nombre : "",
            monto_prestamo: Number(formData.get("monto_prestamo")),
            cantidad_cuotas: Number(formData.get("cantidad_cuotas")),
            periodo_pago: formData.get("periodo_pago") as string,
            monto_cuotas: monto_cuotas,
            cuotas_pagadas: Array(Number(cantidad_cuotas)).fill(0),
            interes: interes ? interes : 0,
            dni_cliente: client?.dni as string,
            fecha_emision: fecha_emision,
            fecha_pago: fecha_pago,
            pagado: false,
        }

        try {
            const validateData = loanSchema.parse(data);

            if(monto_prestamo > stock) {
                alert("El monto es mayor que el stock.");
                return;
            }

            if(validateData && clients.length > 0) {
                setError([]);
                newLoan(data);
                await createLoan(data);
                updateStock(newStock);
                await updateStockDb(newStock);
                setTotal(monto_prestamo + Math.round(agregarInteres));
                setSuccess("Préstamo otorgado correctamente.");
            }
        }
        catch(error) {
            if(error instanceof ZodError) {
                setError(error.errors.map(err => ({ message: err.message })));
            }
        }

    }

    const { isAuthenticated } = useAuth();
    
    if(!isAuthenticated) return null;


    return (
        <main className="flex flex-col items-center min-h-96 w-full">
            <form onSubmit={handleFormData} className="flex flex-col items-center mt-2 gap-2 bg-white w-72 rounded-md border-[1px] border-zinc-300 p-2">
            <span className="text-center font-semibold">Nuevo préstamo</span>
            <input className={STYLES} name="monto_prestamo" type="number" placeholder="Monto del préstamo" min={1000} />
            <select onChange={handleChangeCuota} name="cantidad_cuotas" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                <option disabled defaultValue="Cantidad de cuotas">Cantidad de cuotas</option>
                <option value="1">Pago único</option>
                <option value="2">Dos cuotas</option>
                <option value="3">Tres cuotas</option>
            </select>
            <select name="periodo_pago" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                <option disabled defaultValue="Período de pago">Período de pago</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
            </select>
            <input className={STYLES} name="interes" type="number" placeholder="Porcentaje de interés" min={0} max={100} />
            <select name="id_cliente" className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs min-h-10">
                    <option disabled defaultValue="Seleccionar cliente">{clients.length > 0 ? "Seleccionar cliente" : "No hay clientes disponibles"}</option>
                {clients.length > 0 ? (clients.map((client: Client) => (
                    <option key={client.id_cliente} value={`${client.id_cliente}`}>{client.nombre} - {client.dni}</option>
                ))
                ) : null}
            </select>
            <div className="flex flex-col justify-start w-full">
                <span>Fecha de emisión</span>
                <Input name="fecha_emision" type="date" placeholder="" />
                <span>Fecha final de pago</span>
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