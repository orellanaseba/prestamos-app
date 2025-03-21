"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await axios.post("/api/auth/login", { username, password });
            router.push("/dashboard");
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <main className="flex items-center justify-center">
            <section className="bg-white shadow-sm rounded-md mt-5 p-1 w-72 min-h-44 flex flex-col justify-evenly">
                <h1 className="font-semibold text-lg text-center">Iniciar sesión</h1>
                <input className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs" onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Usuario" />
                <input className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs" onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Contraseña" />
                <button onClick={handleLogin} className="text-sm border-[1px] border-zinc-300 text-white bg-[#3648f5] hover:bg-[#2a37d8] font-semibold p-2 flex items-center justify-center relative rounded-md w-44 min-h-10 mt-2">Iniciar sesión</button>
            </section>
        </main>
    )
}

export default Login;