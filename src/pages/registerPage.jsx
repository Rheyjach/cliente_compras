import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import API_BASE_URL from "../assets/config"

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { setUsuario, setAutenticado } = useAuth()

    async function registrarUsuario(registro) {
        try {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registro.email)) {
                alert("Correo invalido")
                return
            }
            if (registro.clave.length < 4) {
                alert("La contraseña debe tener minimo 4 caracteres")
                return
            }
            const promesa = await fetch(`${API_BASE_URL}/compras/usuarios/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registro),
                credentials: "include"
            })
            if (promesa.status === 201) {
                const respuesta = await promesa.json()
                setUsuario(respuesta)
                setAutenticado(true)
                alert("Usuario creado exitosamente")
                navigate("/profile")
            } else if (promesa.status === 401) {
                throw new Error("El email ya corresponde a un usuario");
            } else {
                throw new Error("Ocurrio un error con el servidor, intente mas tarde");
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="mt-40 text-base xs:text-2xl p-8 ">
            <h2 className="text-4xl mb-2">Registro de usuario</h2>
            <form onSubmit={handleSubmit(async (values) => {
                await registrarUsuario(values)
            })}>
                <input type="email" {...register("email", { required: true })} placeholder="Correo Electronico" className="border border-double mt-2 focus:outline-none" /><br></br>
                {errors.email && <p className="text-lg text-white">Debe ingresar un email</p>}
                <input type="text" {...register("nombre", { required: true })} placeholder="Nombre" className="border border-double mt-2 focus:outline-none" /><br></br>
                {errors.nombre && <p className="text-lg text-white">Debe ingresar un nombre</p>}
                <input type="password" {...register("clave", { required: true })} placeholder="Contraseña" className="border border-double mt-2 focus:outline-none" /><br></br>
                {errors.clave && <p className="text-lg text-white">Debe ingresar una contraseña</p>}
                <button className="cursor-pointer border rounded-lg mt-2 text-base p-1 focus:outline-none focus:bg-white focus:text-orange-600">Registrar</button>
            </form>
            <Link to={"/"} className="underline">Iniciar Sesion</Link>
        </div>
    )
}

export default RegisterPage 