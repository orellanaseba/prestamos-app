"use client"

import { RecordCard } from "../components/RecordCard";
import { useAppStore } from "../store/useAppStore";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getLoans, getStockDb } from "../api/queries/queries";

const Dashboard = () => {

    const { isAuthenticated } = useAuth();
    const loans = useAppStore((state) => state.loans);
    const stock = useAppStore((state) => state.stock);
    const setLoans = useAppStore((state) => state.setLoans);
    const updateStock = useAppStore((state) => state.updateStock);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const data = await getLoans();
                setLoans(data);
                const stockFromDb = await getStockDb();
                if (typeof stockFromDb === "number") {
                    updateStock(stockFromDb);
                } else {
                    console.error("El stock obtenido no es un número válido:", stockFromDb);
                }
            }
            catch(err) {
                console.log("Error al obtener los clientes:", err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, [setLoans, updateStock])

    if(!isAuthenticated) return null;
        
    return (
        <main className="flex flex-col items-center">
        <section className="bg-red-200 mt-5">
            <article className="flex justify-around items-center p-1 w-72 bg-white shadow-sm rounded-md min-h-10">
                <h2 className="font-semibold">Stock disponible</h2>
                <span className="bg-[#3648f5] text-white p-2 rounded-md">
                    <strong>
                        {loading ? "Cargando..." : (

                            "$" + Math.round(stock).toLocaleString("es-AR")
                        )}
                    </strong>
                    </span>
            </article>
        </section>

        <section className="relative mt-5 overflow-y-scroll flex flex-col items-center justify-start gap-2 bg-white shadow-md rounded-md w-72 h-96">
            <div className="sticky top-0 z-40 w-full min-h-10 flex justify-center items-center bg-white">
                <h2 className="text-xl font-semibold">Préstamos emitidos</h2>
            </div>
            <div className="p-1 gap-2 flex flex-col items-center w-full">
                {loans.length > 0 ? <RecordCard /> : <span>No hay historial</span>}
            </div>
        </section>
    </main>
    )
}

export default Dashboard;