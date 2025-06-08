import { useState, useEffect, useContext, createContext } from "react";
import API_BASE_URL from "../assets/config.js";

const authContext = createContext()

export function AuthProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false)
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        async function verificarToken() {
            console.log("Verificando token...")
            try {
                const promesa = await fetch(`${API_BASE_URL}/compras/usuarios/profile`, {
                    method: "GET",
                    credentials: "include"
                })

                if (promesa.status === 200) {
                    const respuesta = await promesa.json()
                    setUsuario(respuesta)
                    setAutenticado(true)
                } else {
                    setUsuario(null)
                    setAutenticado(false)
                }
            } catch (error) {
                console.error(`Error al verificar el token: ${error}`)
                setUsuario(null)
                setAutenticado(false)
            } finally {
                setCargando(false)
            }
        }
        verificarToken()
    }, [])

    return (
        <authContext.Provider value={{ autenticado, usuario, setAutenticado, setUsuario }}>
            {!cargando && children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext)
}


