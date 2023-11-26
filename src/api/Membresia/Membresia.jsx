import { urlBackend } from "../urlBackend";

async function listaMembresia(){
    let token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"membresia",{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

async function usuarioMembresiaByCedula(cedula){
    let token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"usuario/membresia/cedula/"+cedula,{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

async function usuarioMembresiasEntrenador(id){
    let token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"usuario/membresia/activa/"+id+"/entrenador",{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

async function saveUsuarioMembresia(usuarioMembresia){
    let token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"usuario/membresia/save",{
        method:'POST',
        body:JSON.stringify(usuarioMembresia),
        headers:{
            "Authorization":"Bearer "+token,
            "Content-type":"application/json"
        }
    })
    return result;
}

async function sendEmailNuevoUsuario(id){
    let token=localStorage.getItem("token")
    const result =await fetch(urlBackend+"mail/new/"+id,{
        method:'POST',
        headers:{
            "Authorization":"Bearer "+token,

        }
    })
    return result;
}

export {listaMembresia,usuarioMembresiaByCedula,saveUsuarioMembresia,sendEmailNuevoUsuario,usuarioMembresiasEntrenador}