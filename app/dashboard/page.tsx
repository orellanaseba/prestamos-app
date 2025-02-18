import { RecordCard } from "../components/RecordCard";

const Dashboard = () => {

    return (
        <main className="flex flex-col items-center">
        <section className="bg-red-200 mt-5">
            <article className="flex justify-around items-center p-1 w-72 bg-white shadow-sm rounded-md min-h-10">
                <h2 className="font-semibold">Stock disponible</h2>
                <span className="bg-green-300 p-2 rounded-md"><strong>$100.000</strong></span>
            </article>
        </section>

        <section className="relative mt-5 overflow-y-scroll flex flex-col items-center justify-start gap-2 bg-white shadow-md rounded-md w-72 h-72">
            <div className="sticky top-0 z-40 w-full min-h-10 flex justify-center items-center bg-white">
                <h2 className="text-xl font-semibold">Historial</h2>
            </div>
            <div className="p-1 gap-2 flex flex-col items-center w-full">
                <RecordCard />
                <RecordCard />
                <RecordCard />
                <RecordCard />
                <RecordCard />
                <RecordCard />
            </div>
        </section>
    </main>
    )
}

export default Dashboard;