import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import "../styles/card.css";

const CardCharacter = ({ character, setUpdateList, updateList }) => {
  const URL = "http://localhost:3004/personajes";

  const [data, setData] = useState(character);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(`${URL}/${character.id}`, request);
    setUpdateList(!updateList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let request = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(`${URL}/${character.id}`, request).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Personaje actualizado.",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
        setUpdateList(!updateList);
      } else {
        Swal.fire({
          icon: "error",
          title: "No se actualizó el personaje.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, scale: 1 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0 }}
        style={{ width: 300 }}
        whileHover={{ scale: 0.95 }}
      >
        <Card style={{ width: "18rem" }} className="card">
          <Card.Img variant="top" src={character.image} />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>
              Genero: {character.gender} <br></br>
              Estado: {character.status}
            </Card.Text>
            <Button variant="primary" onClick={handleShow}>
              Update
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </motion.div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualización de personaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button variant="success" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CardCharacter;
