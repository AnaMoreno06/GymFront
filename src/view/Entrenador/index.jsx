// reactstrap components
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
  Media,
  Button,
  Table,
} from "reactstrap";
// core components

import Header from "../../components/Headers/Header";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { usuarioMembresiasEntrenador } from "../../api/Membresia/Membresia";

const Index = () => {
  //Columnas de la Datatable

  const [clientes, setClientes] = useState([]);

  const listado = async () => {
    try {
      let id=JSON.parse(localStorage.getItem("data")).id
      const response = await usuarioMembresiasEntrenador(id);
      const data = await response.json();
     
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listado();
  }, []);
  //Columnas de la Datatable
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "Cedula",
      cell: (row) => row.cedula,
      selector: (row) => row.cedula,
      sortable: true,
      wrap: true,
    },
    {
      name: "Telefono",
      cell: (row) => row.telefono,
      selector: (row) => row.telefono,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      cell: (row) => row.email,
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Fecha nacimiento",
    //   cell: (row) => row.fechaNacimiento.split("T")[0],
    //   selector: (row) => row.fechaNacimiento.split("T")[0],
    //   sortable: true,
    //   wrap: true,
    // },

    // {
    //   name: "Acciones",
    //   cell: (row) => (
    //     <div className=" d-flex justify-content-end">
    //       <h3 >
    //         <Link className="text-primary" title="Informacion">
    //           {" "}
              
    //           <i className="fa fa-info-circle" />
    //         </Link>
    //       </h3>
    //     </div>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ];
  const filteredProblemas = [];

  return (
    <>
      <Header />
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* Contenido Cards Problemas Practiva Completadas Otros*/}

        <br />
        {/* Tabla*/}
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">LISTA DE CLIENTES - Items : {clientes.length} </h3>
                  </div>
                  <div className="col text-right">
                    
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable
                  columns={columns}
                  data={clientes}
                  striped
                  pointerOnHover
                  responsive
                  sortActive
                  sortDirection
                  highlightOnHover
                  search // Activa la búsqueda
                  noDataComponent="No se encontraron registros para mostrar."
                  pagination // Activa la paginación
                  paginationComponentOptions={{
                    rowsPerPageText: "Filas por página:",
                    rangeSeparatorText: "de",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Todos",
                    selectAllRowsItemShow: true,
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
