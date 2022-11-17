import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const NewCharacter = () => {
  let character = {
    name: "",
    status: "",
    gender: "",
    image: "",
  };

  const [data, setData] = useState(character);
  let navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const URL = "http://localhost:3004/personajes";
    const request = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(URL, request).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Personaje registrado",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "No se registró el personaje",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center">Nuevo personaje</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rick Sanchez"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL image"
              name="image"
              value={data.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
            >
              <option>Selecciona una opcion</option>
              <option value="Male">M</option>
              <option value="Female">F</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              value={data.status}
            >
              <option>Selecciona una opcion</option>
              <option value="Dead">Muerto</option>
              <option value="Alive">Vivo</option>
              <option value="unknown">Desconocido</option>
            </Form.Select>
          </Form.Group>
          <Button variant="dark" type="submit">
            Crear personaje
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewCharacter;
