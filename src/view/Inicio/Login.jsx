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
import { iniciarSesion } from "../../api/LoginApi";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handelSubmit = (e) => {
    setContraseñaIncorrecta(false);
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").toUpperCase();
    const password = formData.get("password");

    const usuario = {
      email,
      password,
    };
    //Realizo peticion para iniciar sesion
    iniciarSesion(usuario)
      .then((response) => response)
      .then((JWT) => {
        if (JWT.status === 200 && JWT.headers.has("Authorization")) {
          setContraseñaIncorrecta(false);
          const bearerToken = JWT.headers.get("Authorization");
          const token = bearerToken.replace("Bearer ", "");
          localStorage.setItem("token", token);
          localStorage.setItem("data", JSON.stringify(parseJwt(token)));
          const usuario = JSON.parse(localStorage.getItem("data"));
          const rol = usuario.roles[0].nombre.split("_")[1].toLowerCase();
          localStorage.setItem("modulo", rol);
          navigate("/" + rol + "/index");
        } else {
          setContraseñaIncorrecta(true);
          setMensaje("Contraseña o Email incorrecto");
          //eliminarToken();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const eliminarToken = () => {
    // Tiempo de expiración del token en milisegundos (1800000 ms = 30 minutos)
    const tiempoExpiracionToken = 1800000;
    setTimeout(() => {
      alert("se acabo su tiempo");
      localStorage.clear();
    }, tiempoExpiracionToken);
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-white shadow  border my-2" color="primary" outline>
          <CardBody className="px-lg-5 py-lg-5">
            <h1 className="text-center  p-3 text-dark fw-bold">
              INICIAR SESION
            </h1>
            <Form role="form" onSubmit={handelSubmit}>
              {contraseñaIncorrecta && (
                <div
                  className="alert bg-danger  text-white text-center"
                  role="alert"
                >
                  {mensaje}
                </div>
              )}
              <FormGroup className="mb-3">
                <label className="form-control-label text-dark" htmlFor="nombre">
                  CORREO ELECTRONICO
                </label>
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="fa fa-envelope text-primary" aria-hidden="true" />
                  </InputGroupText>
                  <Input
                    className="text-dark border"
                    placeholder="Email"
                    type="text"
                    autoComplete="new-email"
                    name="email"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
              <label className="form-control-label text-dark" htmlFor="nombre">
                      CONTRASEÑA
                    </label>
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="fa fa-lock text-primary" aria-hidden="true" />
                  </InputGroupText>
                  <Input
                  className="text-dark border "
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4 text-white fw-bold bg-primary"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-dark" to={`/auth/recuperar`}>
              <small className="text-dark h5">¿Olvidaste tu contraseña?</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
