"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/verify"); // Nueva ruta de verificación
                if (res.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.log(err);
                setIsAuthenticated(false);
                router.push("/login");
            }
        };

        checkAuth();
    }, [router]);

    return { isAuthenticated }

}