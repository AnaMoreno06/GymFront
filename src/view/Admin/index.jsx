import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Container,
  Modal,
  CardFooter,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Progress,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import Carrusel from "../../components/Carousel/Carrusel";
import ChartComponent from "../../components/Carousel/Charts";
import Header from "../../components/Headers/Header";
import { useUserContext } from "../../components/Context/UserContext";
import {
  asitenciaRegistrada,
  saveAsitencia,
} from "../../api/Asistencias/Asistencia";

const Index = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // Estado para almacenar la hora seleccionada
  //const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(false);
  const modulo = localStorage.getItem("modulo");
  const {
    membresiaActiva,
    setMembresiaActiva,
    cliente,
    setCliente,
    fechaInicio,
    fechaFin,
    asistenciaSeleccionada,
    setAsistenciaSeleccionada,
  } = useUserContext();
  useEffect(() => {
    verificarAsistencia();
    if (membresiaActiva && !asistenciaSeleccionada) {
      toggleRegistrar();
    }
  }, [membresiaActiva, asistenciaSeleccionada]);

  const [modalRegistrar, setModalRegistrar] = useState(false);
  const toggleRegistrar = () => {
    setModalRegistrar(!modalRegistrar);
  };

  // Definir el horario de inicio y fin
  const horaInicio = 5;
  const horaFin = 21;

  // Crear un array para almacenar las filas de la tabla
  const filas = [];

  for (let hora = horaInicio; hora < horaFin; hora++) {
    let hora1 = hora;
    let hora2 = hora;
    let horarioA = "AM";
    let horarioB = "AM";
    if (hora >= 12) {
      horarioA = "PM";
      horarioB = "PM";
    }
    if (hora >= 12) {
      hora2 = hora - 12;
    }
    if (hora > 12) {
      hora1 = hora - 12;
    }

    const horaStr = `${hora1}:00 ${horarioA}- ${hora2 + 1}:00 ${horarioB}`;

    filas.push(
      <tr key={horaStr}>
        <td>
          <FormGroup check inline key={horaStr}>
            <Input
              type="checkbox"
              //checked={horaSeleccionada === horaStr}
              onChange={() => handleHoraSeleccionada(hora)}
              value={horaStr}
              name={`horario`}
              id={horaStr}
            />
            <Label check>{horaStr}</Label>
          </FormGroup>
        </td>
      </tr>
    );
  }

  // Función para manejar la selección de una hora
  const handleHoraSeleccionada = (hora) => {
    toggleRegistrar();
    if (!asistenciaSeleccionada) {
      let id = JSON.parse(localStorage.getItem("data")).id;
      const asistencia = {
        usuarioId: id,
        hora,
      };
      saveAsitencia(asistencia)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAsistenciaSeleccionada(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verificarAsistencia = () => {
    asitenciaRegistrada()
      .then((res) => res.json())
      .then((data) => {
        setAsistenciaSeleccionada(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {modulo !== null && modulo === "cliente" ? (
          <Card className="my-2 text-justify " >
            <CardBody >
              <Row>
                <div className="col">
                  {membresiaActiva ? (
                    <>
                      <p className="h2 ">Membresia Activa  <i className="fa fa-check-circle fa-1x" aria-hidden="true"></i></p>
                      <p>
                        Desde {fechaInicio.fechaInicio?.split("T")[0]} Hasta{" "}
                        {fechaFin.fechaFin?.split("T")[0]}{" "}
                      </p>
                    </>
                  ) : (
                    <>
                    <p className="text-danger h2">Membresia terminada <i className="fa fa-ban fa-1x" aria-hidden="true"></i> </p>
                    <p>Estimado   {cliente?.usuario?.nombre} para renovar su membresia dirijase con la recepcionista </p>
                    </>
                  )}
                </div>
                {!asistenciaSeleccionada && (
                  <div className="col text-right ">
                    <Button
                      className="my-0 text-white"
                      type="button"
                      color="default"
                      onClick={toggleRegistrar}
                    >
                      Asistencia
                    </Button>
                  </div>
                )}
              </Row>
            </CardBody>
          </Card>
        ) : null}
        <Row>
          <Col md="6" className="mt-3">
            <Carrusel />
          </Col>
          <Col md="6" className="mt-3">
            <Card
              className="card-stats mb-4 mb-xl-0 border "
              color="dark"
              outline
            >
              <CardBody>
                <Row>
                  <Link
                    className="text-dark curso-link"
                    to={"/usuario/problemas"}
                  >
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i className="fa fa-clock" />
                      </div>
                    </Col>
                  </Link>

                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0 mt-3"
                    >
                      Horario
                    </CardTitle>
                  </div>
                </Row>
                <Row className="text-center text-blue d-block">
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Lunes a Viernes <i className="fa fa-long-arrow-right" />{" "}
                      5:00 AM - 9:00 PM
                    </span>
                  </p>

                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Sabados y Festivos{" "}
                      <i className="fa fa-long-arrow-right" /> 7:00 AM - 12:00
                      PM
                    </span>
                  </p>
                </Row>
                <Link onClick={toggle}>
                  <p className="mt-3 mb-0 text-muted text-sm text-center">
                    <span className="text-blue mr-2 ">
                      <i className="fa fa-users" /> Información de asistencia
                    </span>
                  </p>
                </Link>
              </CardBody>
            </Card>
            <hr />
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                      <i className="fa fa-map" />
                    </div>
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0 mt-3"
                    >
                      UBICACION
                    </CardTitle>
                  </div>
                </Row>
                <Row className="text-center text-blue d-block">
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Av. Libertadores con Canal Bogotá. Parqueadero CC. Cúcuta
                      - Cúcuta, NSA - 0000
                    </span>
                  </p>
                </Row>
                <Link>
                  <p className="mt-3 mb-0 text-muted text-sm text-center">
                    <span className="text-blue mr-2">
                      <i className="fa fa-location-arrow" /> Ver Mapa
                    </span>
                  </p>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal registrar asistencia */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalRegistrar}
        toggle={toggleRegistrar}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-3 py-lg-2">
              <Card className="shadow">
                <div className="text-muted text-center mt-2 mb-3">
                  <h2>Registrar asistencia diaria</h2>
                </div>
                <Form>
                  <Row>
                    <Col sm="6">
                      <Table
                        className="align-items-center table-flush text-center"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Horario A</th>
                          </tr>
                        </thead>
                        <tbody>{filas.slice(0, filas.length / 2)}</tbody>
                      </Table>
                    </Col>
                    <Col sm="6">
                      <Table
                        className="align-items-center table-flush text-center"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Horario B</th>
                          </tr>
                        </thead>
                        <tbody>{filas.slice(filas.length / 2)}</tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </CardBody>
          </Card>
        </div>
      </Modal>
      {/*Modal Ver Asistencia*/}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div
                className="text-muted text-center mt-2 mb-3"
                style={{ flex: 1, textAlign: "center" }}
              >
                <h2>Tabla Asistencia</h2>
              </div>
              <button
                className="btn btn-close text-dark"
                style={{
                  backgroundColor: "transparent", // Color de fondo del botón transparente
                  border: "none",
                }}
                onClick={toggle}
              >
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </CardHeader>

            <CardBody className="px-lg-3 py-lg-2">
              <ChartComponent />
            </CardBody>
            <CardFooter>
              <div className="text-center">
                {/* <Button
                  className="my-0 text-white"
                  type="button"
                  color="default"
                  onClick={toggle}
                >
                  Cerrar
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Index;
