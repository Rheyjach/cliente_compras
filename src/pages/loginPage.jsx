import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import API_BASE_URL from "../assets/config"



function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const {setUsuario,setAutenticado} =useAuth()

    async function iniciarSesion(usuario) {
        try {
            const promesa = await fetch(`${API_BASE_URL}/compras/usuarios/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json"  },
                body:JSON.stringify(usuario),
                credentials:"include"
            })
            if(promesa.status === 200){
                const respuesta= await promesa.json()
                setUsuario(respuesta)
                setAutenticado(true)
                navigate("/profile")
            }else if(promesa.status === 401){
                throw new Error("El usuario no existe");
                
            }else if(promesa.status === 404){
                throw new Error("Contraseña incorrecta");   
            }else{
                throw new Error("Ocurrio un error con el servidor, intente mas tarde");
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="mt-40 text-base xs:text-2xl p-8 ">
           <h2 className="text-4xl mb-2">Inicio de sesion</h2> 
            <form onSubmit={handleSubmit(async (values) => {
                await iniciarSesion(values)
            })}>
                <input type="email" {...register("email", { required: true })} placeholder="Correo electronico" className="border border-double mt-2 focus:outline-none"  /><br></br>
                {errors.email && <p className="text-lg text-white">Debe ingresar un email</p>}
                <input type="password" {...register("clave", { required: true })} placeholder="Contraseña" className="border border-double mt-2 focus:outline-none" /><br></br>
                {errors.clave && <p className="text-lg text-white">Debe ingresar una contraseña</p>}
                <button className="cursor-pointer border rounded-lg mt-2 text-base p-1 focus:outline-none focus:bg-white focus:text-orange-600 ">Ingresar</button>
            </form>
            <Link to={"/register"} className="underline">Registrarse</Link>
        </div>
    )
}

export default LoginPage 