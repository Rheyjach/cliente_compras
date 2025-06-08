import Header from "../components/headerProfile"
import { useEffect, useState, useRef } from "react"
import { obtenerDatos, agregarDatos, eliminarDatos, editarDatos } from "../assets/apiProfile.js"


function ProfilePage() {
    /* Referencia de elementos*/
    const referenciaNombre = useRef(null)
    const referenciaPrecio = useRef(null)
    const referenciaCantidad = useRef(null)
    const referenciaCategoria = useRef(null)

    /* Estados*/
    const [modoBoton, setModoBoton] = useState("Ingresar")
    const [compras, setCompras] = useState([])
    const [contenido, setContenido] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
    const [compraEditada, setCompraEditada] = useState("")

    /* Funciones*/

    async function insertarYeditar() {
        if (modoBoton == "Ingresar") {
            const nombre = referenciaNombre.current.value.trim()
            const precio_unitario = referenciaPrecio.current.value
            const cantidad = referenciaCantidad.current.value
            const categoria = referenciaCategoria.current.value
            if (nombre && precio_unitario && cantidad && categoria) {
                if (precio_unitario >= 0 && cantidad >= 0) {
                    for (let compra of compras) {
                        if (nombre.toLowerCase() == compra.nombre.toLowerCase()) {
                            alert("La compra ingresada ya se encuentra en el sistema, si quiere puede editarla")
                            return
                        }
                    }
                    const data = await agregarDatos({ nombre, precio_unitario, cantidad, categoria })
                    if (data) {
                        const datos = await obtenerDatos()
                        if (datos) {
                            setCompras(datos)
                            referenciaNombre.current.value = ""
                            referenciaPrecio.current.value = ""
                            referenciaCantidad.current.value = ""
                            alert("Información ingresada exitosamente")
                        }
                    }
                } else {
                    alert("El precio unitario y la cantidad no pueden ser valores negativos")
                }
            } else {
                alert("Debe rellenar todos los campos para poder ingresar la información")
            }
        } else {
            const nombreEditado = referenciaNombre.current.value.trim()
            const precioEditado = referenciaPrecio.current.value
            const cantidadEditada = referenciaCantidad.current.value
            const categoriaEditada = referenciaCategoria.current.value

            if (nombreEditado && precioEditado && cantidadEditada && categoriaEditada) {
                if (precioEditado >= 0 && cantidadEditada >= 0) {
                    if (nombreEditado == compraEditada.nombre && precioEditado == compraEditada.precio_unitario && cantidadEditada == compraEditada.cantidad && categoriaEditada == compraEditada.categoria) {
                        setModoBoton("Ingresar")
                        referenciaNombre.current.value = ""
                        referenciaPrecio.current.value = ""
                        referenciaCantidad.current.value = ""
                        alert("No se han realizado cambios con respecto a los datos iniciales")
                    } else {
                        const update = { nombre: nombreEditado, precio_unitario: precioEditado, cantidad: cantidadEditada, categoria: categoriaEditada }
                        const dataUpdate = await editarDatos(compraEditada._id, update)
                        if (dataUpdate) {
                            const dataCurrent = await obtenerDatos()
                            if (dataCurrent) {
                                setCompras(dataCurrent)
                                setModoBoton("Ingresar")
                                setCompraEditada("")
                                referenciaNombre.current.value = ""
                                referenciaPrecio.current.value = ""
                                referenciaCantidad.current.value = ""
                                alert("Informacion editada exitosamente")
                            }
                        }
                    }
                } else {
                    alert("El precio unitario y la cantidad no pueden ser valores negativos")
                }
            } else {
                alert("Debe rellenar todos los campos para poder actualizar la información")
            }
        }
    }

    async function eliminacionInformacion(id) {
        const data = await eliminarDatos(id)
        if (data) {
            const datos = await obtenerDatos()
            if (datos) {
                setCompras(datos)
            }
        }
    }

    function editarInformacion(objetoEditado) {
        setCompraEditada(objetoEditado)
        setModoBoton("Actualizar")
        referenciaNombre.current.value = objetoEditado.nombre
        referenciaPrecio.current.value = objetoEditado.precio_unitario
        referenciaCantidad.current.value = objetoEditado.cantidad
        referenciaCategoria.current.value = objetoEditado.categoria
    }

    function mostrarInformacion(seleccion) {
        setCategoriaSeleccionada(seleccion)
        if (seleccion == "Todas" || seleccion == "") {
            setContenido(compras)
        } else {
            const datosSeleccionados = compras.filter((valor) => valor.categoria == seleccion)
            setContenido(datosSeleccionados)
        }
    }

    function busquedaNombre(valor) {
        const datosBuscados = compras.filter((item) => item.nombre.includes(valor))
        setContenido(datosBuscados)
    }

    useEffect(() => {
        async function datosIniciales() {
            const data = await obtenerDatos() || []
            setCompras(data)
        }
        datosIniciales()
    }, [])

    useEffect(() => {
        mostrarInformacion(categoriaSeleccionada)
    }, [compras])

    return (
        <div className="p-5">
            <h1 className="text-[8px] xs:text-base sm:text-4xl mb-2 mt-6">Canasta de compras</h1>
            <Header />
            <h2 className="text-[8px] xs:text-base sm:text-3xl mb-2 mt-2 underline">Ingresar Compra</h2>
            <div className="flex flex-wrap justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Nombre</label> <input type="text" ref={referenciaNombre} className="border border-double  focus:outline-none text-[8px] xs:text-sm sm:text-base w-30" /></div>
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Precio Unitario</label> <input type="number" ref={referenciaPrecio} className="border border-double  focus:outline-none text-[8px] xs:text-sm sm:text-base w-30" /></div>
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Cantidad</label><input type="number" ref={referenciaCantidad} className="border border-double  focus:outline-none text-[8px] xs:text-sm sm:text-base w-30" /></div>
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Categoria</label>
                    <select ref={referenciaCategoria} className="border mr-1 ml-1 focus:outline-none focus:bg-orange-600 text-[8px] xs:text-sm sm:text-base">
                        <option value="Comida">Comida</option>
                        <option value="Electrodomestico">Electrodomestico</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Mueble">Mueble</option>
                        <option value="Aseo">Aseo</option>
                        <option value="Otro">Otro</option>
                    </select></div>
                <button onClick={insertarYeditar} className="cursor-pointer border rounded-lg  text-[8px] xs:text-[10px] sm:text-sm p-1 focus:outline-none focus:bg-white focus:text-orange-600  mt-2 max-h-8">{modoBoton}</button>
            </div>
            <Filtros funcionFiltro={mostrarInformacion} funcionBusqueda={busquedaNombre} />
            <Mostrar compras={contenido} funcionEliminar={eliminacionInformacion} funcionEditar={editarInformacion} />
        </div>
    )
}

export default ProfilePage


function Filtros({ funcionFiltro, funcionBusqueda }) {
    return (
        <div className="mt-4">
            <h2 className="text-[8px] xs:text-base sm:text-3xl mb-2 mt-2 underline">Filtros de compras</h2>
            <div className="flex flex-wrap justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Filtro por categoria</label>
                    <select onChange={(e) => funcionFiltro(e.target.value)} className="border mr-1 ml-1 focus:outline-none focus:bg-orange-600 text-[8px] xs:text-sm sm:text-base">
                        <option value="Todas">Todas</option>
                        <option value="Comida">Comida</option>
                        <option value="Electrodomestico">Electrodomestico</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Mueble">Mueble</option>
                        <option value="Aseo">Aseo</option>
                        <option value="Otro">Otro</option>
                    </select></div>
                <div className="flex flex-col sm:flex-row sm:items-center mt-2 mx-2"><label className="mr-1 ml-2 text-[8px] xs:text-sm sm:text-base">Busqueda por nombre</label> <input type="text" onInput={(e) => funcionBusqueda(e.target.value)} className="border border-double focus:outline-none text-[8px] xs:text-sm sm:text-base w-30" /></div>

            </div>

        </div>
    )
}

function Mostrar({ compras, funcionEliminar, funcionEditar }) {
    return (
        <div className="border mt-3 mb-3 rounded-lg mx-5 md:mx-25 text-yellow-600 bg-white">
            <h2 className="text-[8px] xs:text-base sm:text-3xl mb-2 mt-2 underline">Compras Ingresadas</h2>
            <ul className="text-[8px] sm:text-xs  overflow-x-auto text-center">
                {compras.map((valor, index) => {
                    return (
                        <li key={index} className="whitespace-nowrap mt-[4px]">{valor.nombre} - Precio Unitario: {Number(valor.precio_unitario).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} - Cantidad: {valor.cantidad} - {valor.categoria}
                            <button onClick={() => funcionEliminar(valor._id)} className="cursor-pointer border rounded-lg  ml-2 text-[8px] xs:text-sm sm:text-base p-1 focus:outline-none focus:bg-orange-600 focus:text-white  ">Eliminar</button>
                            <button onClick={() => funcionEditar(valor)} className="cursor-pointer border rounded-lg ml-2  text-[8px] xs:text-sm sm:text-base p-1 focus:outline-none focus:bg-orange-600 focus:text-white ">Editar</button></li>
                    )
                })}
            </ul>
            <h3 className="underline text-[8px] xs:text-base sm:text-sm font-bold">Valor total: {compras.reduce((acumulador, compra) => acumulador + (Number(compra.precio_unitario) * Number(compra.cantidad)), 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h3>
        </div>
    )
}