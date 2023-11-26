import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  CardText,
  Container,
  Modal,
  CardFooter,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Headers/Header";
import { listaEjercicios } from "../../api/Rutinas/Ejercicios";
import { listaAsistencia } from "../../api/Asistencias/Asistencia";

import DataTable from "react-data-table-component";
import {
  customTheme,
  customStyles,
} from "../../components/Datatable/DatatableCustom";

const Entrenamientos = () => {
  /*
    #######---Ejercicios----------#################################################################3#######
    */

  //Lista de asistencia
  const [asistencias, setAsistencias] = useState([]);
  useEffect(() => {
    listadoAsistencia();
  }, []);
  const listadoAsistencia = () => {
    listaAsistencia()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAsistencias(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Lista de ejercicios
  const [ejercicios, setEjercicios] = useState([]);
  const [filtroAsistencia, setFiltroAsistencia] = useState("");

  const listadoEjercicios = () => {
    listaEjercicios()
      .then((response) => response.json())
      .then((data) => {
        setEjercicios(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Filtro de la tabla
  const filtroAsistencias = asistencias.filter((asistencia) =>
    asistencia.fechaRegistro.toLowerCase().includes(filtroAsistencia.toLowerCase())
  );

  
  //Convertir url del video
  const convertToEmbedUrl = (url) => {
    // Expresión regular para encontrar el ID del video en una URL de YouTube
    const regExp = /(?:\?v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;

    // Intenta hacer coincidir la URL con la expresión regular
    const match = url.match(regExp);

    if (match) {
      // Si se encuentra una coincidencia, el ID del video estará en match[1]
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return embedUrl;
    }

    // Si no se encuentra una coincidencia, devuelve la URL original
    return url;
  };

  const formatoHora = (hora) => {
    let formato = "";
    let horario = ":00 AM";
    if (hora >= 12) {
      horario = ":00 PM";
    }
    if (hora > 12) {
      let nuevaHora = hora - 12;
      formato = nuevaHora + horario;
    } else {
      formato = hora + horario;
    }
    return formato;
  };
  const columns = [
    {
      name: "Hora",
      cell: (row) => formatoHora(row.hora),
      selector: (row) => formatoHora(row.hora),
      sortable: true,
      wrap: true,
    },
    {
      name: "Fecha Registro",
      cell: (row) => row.fechaRegistro.split("T")[0],
      selector: (row) => row.fechaRegistro.split("T")[0],
      sortable: true,
      wrap: true,
    },

    {
      name: "Acciones",
      cell: (row) => (
        <div className=" d-flex justify-content-end">
          <h3
          // onClick={() => handleOpciones(row)}
          >
            <Link
              className="text-primary"
              title="Registrar Entrenamiento"
              to={`/cliente/entrenamientos/${row.id}/registrar`}
            >
              {" "}
              <i className="fa fa-plus-circle" />
            </Link>
          </h3>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  useEffect(() => {
    listadoEjercicios();
  }, []);

  const retornaEjercicioPorId = (id, status) => {
    const ejercicioEncontrado = ejercicios.find(
      (ejercicio) => ejercicio.id === id
    );

    if (status) {
      return ejercicioEncontrado.video;
    } else {
      return ejercicioEncontrado;
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
      <Card className="my-2 text-justify">
          <CardBody>
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">
                  LISTA DE ASISTENCIAS - Items : {asistencias.length}
                </h3>
              </div>
            </Row>
            <FormGroup row className="justify-content-end mr-2 mt-3">
              <Label for="filtro" sm={3} className="form-control-label">
                Buscar :
              </Label>

              <Col sm={3}>
                <Input
                  type="date"
                  className=""
                  placeholder="Ingrese el Nombre del Ejercicio..."
                  value={filtroAsistencia}
                  onChange={(e) => setFiltroAsistencia(e.target.value)}
                />
              </Col>
            </FormGroup>
          </CardBody>
        </Card>
        {filtroAsistencias.map((asistencia) => (
          <Card className="my-2 text-justify">
            <CardBody>
              <Row>
                <Col sm="12">
                  <h3>Asistencia</h3>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="nombre">
                      Hora
                    </label>
                    <Input
                      className="form-control-alternative text-dark fw-bold"
                      id="hora"
                      name="hora"
                      placeholder="10"
                      value={formatoHora(asistencia.hora)}
                      type="text"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="nombre">
                      Fecha Registro
                    </label>
                    <Input
                      className="form-control-alternative text-dark fw-bold"
                      id="hora"
                      name="fechaRegistro"
                      placeholder="10"
                      value={asistencia.fechaRegistro}
                      type="text"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="nombre">
                      Registrar Entrenamiento
                    </label>
                    <div className=" d-flex justify-content-left">
                      <h3
                      // onClick={() => handleOpciones(row)}
                      >
                        <Link
                          className="text-primary"
                          title="Registrar Entrenamiento"
                          to={`/cliente/entrenamientos/${asistencia.id}/registrar`}
                        >
                          {" "}
                          <i className="fa fa-plus-circle fa-2x" />
                        </Link>
                      </h3>
                    </div>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <label
                      className="form-control-label text-primary"
                      htmlFor="nombre"
                    >
                      Entrenamiento
                    </label>
                    <>
                      {asistencia.entrenamientos?.map((entrenamiento) => (
                        <>
                          <Row key={entrenamiento.id}>
                            <Col sm="6">
                              <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                  title="YouTube Video"
                                  className="embed-responsive-item"
                                  src={convertToEmbedUrl(
                                    retornaEjercicioPorId(
                                      entrenamiento.ejercicioId,
                                      true
                                    )
                                  )}
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </Col>
                            <Col sm="6">
                              <h3>
                                {
                                  retornaEjercicioPorId(
                                    entrenamiento.ejercicioId,
                                    false
                                  ).nombre
                                }
                              </h3>
                              <table className="table text-center">
                                <thead>
                                  <td>Series</td>
                                  <td>Repeticiones</td>
                                  <td>Peso</td>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th>{entrenamiento.series}</th>
                                    <th>{entrenamiento.repeticiones}</th>
                                    <th>{entrenamiento.peso}</th>
                                  </tr>
                                </tbody>
                              </table>
                            </Col>
                          </Row>
                          <hr />
                        </>
                      ))}
                    </>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Entrenamientos;
