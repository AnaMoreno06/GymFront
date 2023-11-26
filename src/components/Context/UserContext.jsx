import React, { createContext, useContext, useEffect, useState } from "react";
import { usuarioMembresiaByCedula } from "../../api/Membresia/Membresia";
import { asitenciaRegistrada } from "../../api/Asistencias/Asistencia";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [membresiaActiva, setMembresiaActiva] = useState(false); // Puedes inicializarlo con el valor inicial de la imagen
  const [cliente, setCliente] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(false);
  useEffect(() => {
    getCliente();
  }, []);
  useEffect(() => {
    if(membresiaActiva){
      buscarFechas()
      verificarAsistencia()
    }
  }, [membresiaActiva]);
  const getCliente = async () => {
    let cedula = JSON.parse(localStorage.getItem("data")).cedula;
    usuarioMembresiaByCedula(cedula)
      .then((res) => res.json())
      .then((data) => {
        setCliente(data);
        if (data.usuarioMembresias.length > 0) {
          setMembresiaActiva(true);
        }else{
         // localStorage.setItem("token","no valido")
        }
        // if (data.usuarioMembresias!==null) {

        //   let size = cliente.usuarioMembresias.length;
        //   setFechaInicio(cliente.usuarioMembresias[0]);
        //   setFechaFin(cliente.usuarioMembresias[size - 1]);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const buscarFechas = () => {
    let size = cliente.usuarioMembresias.length;
    setFechaInicio(cliente.usuarioMembresias[0]);
    setFechaFin(cliente.usuarioMembresias[size - 1]);
  };


  const verificarAsistencia=()=>{
    asitenciaRegistrada()
    .then(res=>res.json())
    .then(data=>{
      setAsistenciaSeleccionada(data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <UserContext.Provider
      value={{
        membresiaActiva,
        setMembresiaActiva,
        cliente,
        setCliente,
        fechaInicio,
        setFechaInicio,
        fechaFin,
        setFechaFin,
        asistenciaSeleccionada,
        setAsistenciaSeleccionada
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
