import { useAuth } from "../context/authProvider";
import API_BASE_URL from "../assets/config";

function Header() {
    const { usuario, setAutenticado, setUsuario } = useAuth()

    async function cerrarSesion() {
        try {
            const promesa = await fetch(`${API_BASE_URL}/compras/usuarios/profile/logout`, {
                method: "DELETE",
                credentials: "include"
            })
            if (promesa.status === 200) {
                setUsuario(null)
                setAutenticado(false)
            } else {
                throw new Error("Ha ocurrido un problema con el servidor")
            }
        } catch (error) {
            alert(error.message)
            setUsuario(null)
            setAutenticado(false)
        }
    }

    async function eliminarCuenta() {
        const confirmacion = window.confirm("¿Esta seguro que desea eliminar su cuenta?")
        if (confirmacion) {
            try {
                const promesa = await fetch(`${API_BASE_URL}/compras/usuarios/profile/delete`, {
                    method: "DELETE",
                    credentials: "include"
                })
                if (promesa.status === 200) {
                    const eliminarDatos = await fetch(`${API_BASE_URL}/compras/funcionalidades`, {
                        method: "DELETE",
                        credentials: "include"
                    })
                    if (eliminarDatos.status === 200 || eliminarDatos.status === 401) {
                        alert("Cuenta eliminada correctamente")
                        cerrarSesion()
                    } else {
                        alert("Se ha eliminado su cuenta y el servidor se encargara de eliminar sus datos")
                        cerrarSesion()
                    }
                } else {
                    throw new Error("No se ha podido eliminar su cuenta por un problema con el servidor, intenta de nuevo mas tarde");
                }
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <header className="border md:mx-25 mx-5 mt-5 flex flex-wrap  justify-between p-5 items-center rounded-lg bg-white text-yellow-600">
            <span className="usuario">Perfil: {usuario.nombre}</span>
            <div className="flex flex-col">
                <button onClick={eliminarCuenta} className="cursor-pointer border rounded-lg mt-1 text-[8px] xs:text-xs sm:text-base p-1 focus:outline-none focus:text-white focus:bg-orange-600 ">Eliminar Cuenta</button>
                <button onClick={cerrarSesion} className="cursor-pointer border rounded-lg mt-1 text-[8px] xs:text-xs sm:text-base p-1 focus:outline-none focus:text-white focus:bg-orange-600 ">Cerrar Sesion</button>
            </div>
        </header>
    )
}

export default Header;