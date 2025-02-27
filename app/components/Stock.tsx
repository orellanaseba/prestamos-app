import { useAppStore } from "../store/useAppStore"

export const Stock = () => {
    const stock = useAppStore(state => state.stock);
    return (
        <div className="absolute p-2 right-0 bg-white rounded-md border-[1px] border-zinc-300 shadow-sm top-5">
            <span>${Math.floor(stock).toLocaleString("es-AR")}</span>
        </div>
    )
}