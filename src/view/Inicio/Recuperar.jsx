// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Login = () => {
  const navigate = useNavigate();
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [errorVerificacion, setErrorVerificacion] = useState(false);
  const [codigoEmailValidado, setCodigoEmailValidado] = useState(false);
  const [errorCrearCuenta, setErrorCrearCuenta] = useState(false);
  const [cuentaCreada, setcuentaCreada] = useState(false);
  const [errorCambioPassowrd, setErrorCambioPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [intentos,setIntentos]=useState(0);

  // const handelSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);
  //   const email = formData.get("email");

  //   if (email !== "") {
  //     const usuario = {
  //       correoInstitucional: formData.get("email").toUpperCase(),
  //     };

  //     verificarEmail(usuario)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data === true) {
  //           localStorage.setItem("registro", JSON.stringify(usuario));
  //           setEmailVerificado(true); // Actualiza el estado para indicar que el email ha sido verificado
  //           setErrorVerificacion(false);
  //           enviarEmail(usuario);
  //         } else {
  //           setErrorVerificacion(true);
  //         }
  //       })
  //       .catch((err) => {
  //         setErrorVerificacion(true);
  //       });
  //   }
  // };
  // const enviarEmail = (usuario) => {
  //   setLoading(true);
  //   sendEmailCambio(usuario)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data === true) {
  //         setLoading(false);
  //       }
  //     });
  // };
  // const handelSubmitCodigoEmail = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   const codigoVerificacion = formData.get("codigoEmail");

  //   const correo = JSON.parse(
  //     localStorage.getItem("registro")
  //   ).correoInstitucional;
  //   const codigoPassword = {
  //     token: codigoVerificacion,
  //     usuario: {
  //       correoInstitucional: correo,
  //     },
  //   };
  //   let numeroIntentos=intentos
  //   setIntentos(numeroIntentos+1)
  //   validarCodigoCambio(codigoPassword)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data === true) {
  //         setCodigoEmailValidado(true);
  //       } else {
  //         setErrorVerificacion(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorVerificacion(true);
  //     });
  // };

  // const handelSubmitContraseñas = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   const contraseña = formData.get("password");
  //   const repetirContraseña = formData.get("repeatPassword");

  //   // Aquí puedes realizar la validación de las contraseñas, por ejemplo, comparar que sean iguales
  //   if (contraseña === repetirContraseña) {
  //     const correo = JSON.parse(
  //       localStorage.getItem("registro")
  //     ).correoInstitucional;
  //     const usuario = {
  //       correoInstitucional: correo,
  //       password: contraseña,
  //     };
  //     usuarioCambioPassword(usuario)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data === true) {
  //           setErrorCambioPassword(false);
  //           setcuentaCreada(true);
  //           setTimeout(() => {
  //             navigate("/auth/login");
  //           }, 3500);
  //         } else {
  //           setErrorCrearCuenta(true);
  //         }
  //       });
  //   } else {
  //     setErrorCambioPassword(true);
  //   }
  // };

  return (
    <>
      <Col lg="5" md="7">
        <Card
          className="bg-gradient-white shadow border my-2"
          color="dark"
          outline
        >
          <CardBody className="px-lg-5 py-lg-5">
            <h1 className="text-center p-3 text-dark">Recuperación</h1>
            {!emailVerificado && (
              <Form role="form" >
                <p className="text-center ">
                Ingresa tu correo electronico.{" "}
                </p>
                {errorVerificacion && ( // Muestra el mensaje de error solo si hay un error de verificación
                  <div
                    className="alert bg-danger text-white text-center"
                    role="alert"
                  >
                    Verifique la información
                  </div>
                )}
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="fa fa-envelope text-primary" aria-hidden="true" />
                    </InputGroupText>
                    <Input
                    className="border"
                      placeholder="Email"
                      type="text"
                      autoComplete="new-email"
                      name="email"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4 text-white bg-primary"  type="submit">
                    Siguiente
                  </Button>
                </div>
              </Form>
            )}

            {emailVerificado && !codigoEmailValidado && (
              <Form role="form" onSubmit={handelSubmitCodigoEmail}>
                <p className="text-center ">
                Ingresa el código enviado a tu correo institucional. Tiene 3 intentos.
                </p>
                {errorVerificacion && ( // Muestra el mensaje de error solo si hay un error de verificación
                  <div
                    className="alert bg-danger text-white text-center"
                    role="alert"
                  >
                    Código incorrecto intento #{intentos}.
                  </div>
                )}
                {loading ? (
                  <p className="text-center text-warning ">Enviando...</p>
                ) : (
                  <p className="text-center text-success">Código enviado</p>
                )}
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </InputGroupText>
                    <Input
                      placeholder="XXX-XXX"
                      type="number"
                      autoComplete="Codigo email"
                      name="codigoEmail"
                      min={0}
                      max={999999}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  {intentos<3 ?(
                    <Button className="my-4" color="danger" type="submit">
                    Validar Codigo
                  </Button>
                  ):(<p>no se pudo validar su identidad </p>)}
                </div>
              </Form>
            )}

            {emailVerificado && codigoEmailValidado && (
              <Form role="form" onSubmit={handelSubmitContraseñas}>
                <p className="text-center ">Escribe tu contraseña.</p>
                {errorCambioPassowrd && ( // Muestra el mensaje de error solo si hay un error de verificación
                  <div
                    className="alert bg-danger text-white text-center"
                    role="alert"
                  >
                    Las contraseñas no son iguales.
                  </div>
                )}
                 {cuentaCreada && ( // Muestra el mensaje de error solo si hay un error de verificación
                  <div
                    className="alert bg-success text-white text-center"
                    role="alert"
                  >
                    Cambiaste tu contraseña exitosamente.
                  </div>
                )}
                {errorCrearCuenta && ( // Muestra el mensaje de error solo si hay un error de verificación
                  <div
                    className="alert bg-danger text-white text-center"
                    role="alert"
                  >
                    Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.
                  </div>
                )}


                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="fa fa-lock" aria-hidden="true" />
                    </InputGroupText>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      autoComplete="new-password"
                      name="password"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="fa fa-lock" aria-hidden="true" />
                    </InputGroupText>
                    <Input
                      placeholder="Repetir Contraseña"
                      type="password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4" color="danger" type="submit">
                    Cambiar contraseña
                  </Button>
                </div>
              </Form>
            )}
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-dark" to={`/auth/login`}>
              <small className="text-dark h5">Volver a iniciar sesión</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
