
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import urlImagen from "../../assets/img/user.png";
const AdminNavbar = () => {
  const navigate = useNavigate();
  // Función para cerrar sesión y redirigir al usuario al login
  const handleCerrarSesion = () => {
    // Borramos el token del localStorage
    localStorage.clear();

    // Redirigimos al usuario al login
    navigate("/auth/index", { replace: true });
    //window.location.replace("/auth/login");
  };
  
  

  const [nombreUser, setNombreUser] = useState("");
  useEffect(() => {
    try {
      const nombreUsuario = JSON.parse(localStorage.getItem("data")).nombre;
      
      setNombreUser(nombreUsuario);
    } catch (error) {
      // Si hay un error al obtener el nombre del usuario, simplemente dejamos el nombre vacío
      setNombreUser("");
    }
  }, []);


  

  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* <a
            className="btn h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            onClick={handleInicio}
          >
            INICIO
          </a> */}
          <a className="btn h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
             target="_blank">Bienvenido </a>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={urlImagen}
                      style={{
                        width: "40px", // Ajusta el tamaño de acuerdo a tus preferencias
                        height: "40px", // Ajusta el tamaño de acuerdo a tus preferencias
                        objectFit: "cover", // Escala la imagen para ajustarse manteniendo la proporción
                        borderRadius: "50%", // Hace que la imagen sea redonda
                      }}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {nombreUser} {/* Mostramos el nombre del usuario aquí */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" end>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Opciones</h6>
                </DropdownItem>
                

                <DropdownItem
                  >
                  <i class="fa-solid fa-user"></i>
                  <span>Mi Perfil</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem onClick={handleCerrarSesion}>
                <i class="fa-solid fa-right-from-bracket"></i>
                  <span>Cerrar Sesion</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
