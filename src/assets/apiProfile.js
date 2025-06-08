import API_BASE_URL from "./config";

export async function obtenerDatos(){
    try {
        const promesa= await fetch(`${API_BASE_URL}/compras/funcionalidades`,{
            method:"GET",
            credentials:"include"
        })
        if(promesa.status === 200){
            const respuesta= await promesa.json()
            return respuesta
        }else{
            throw new Error("No se pudo obtener los datos iniciales");
        }
    } catch (error) {
        alert(error.message)
    }
}


export async function agregarDatos(compra){
    try {
        const promesa= await fetch(`${API_BASE_URL}/compras/funcionalidades`,{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify(compra),
            credentials:"include"
        })
        if(promesa.status === 201){
            const respuesta= await promesa.json()
            return respuesta
        }else{
            throw new Error("No se pudo agregar los datos a la base de datos");
        }
    } catch (error) {
        alert(error.message)
    }
}


export async function eliminarDatos(id){
    try {
        const promesa= await fetch(`${API_BASE_URL}/compras/funcionalidades/${id}`,{
            method:"DELETE",
            credentials:"include"
        })
        if(promesa.status === 200){
            const respuesta= await promesa.json()
            return respuesta
        }else{
            throw new Error("No se pudo eliminar los datos de la base de datos");
        }
    } catch (error) {
        alert(error.message)
    }
}


export async function editarDatos(id,compra){
    try {
        const promesa= await fetch(`${API_BASE_URL}/compras/funcionalidades/${id}`,{
            method:"PUT",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify(compra),
            credentials:"include"
        })
        if(promesa.status === 200){
            const respuesta= await promesa.json()
            return respuesta
        }else{
            throw new Error("No se pudo editar los datos de la base de datos");
        }
    } catch (error) {
        alert(error.message)
    }
}