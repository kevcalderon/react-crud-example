import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import CardCharacter from "./CardCharacter";
import Row from "react-bootstrap/Row";
// import { AnimatePresence } from "framer-motion";
import "../styles/listCharacter.css";

const ListCharacter = () => {
  const URL = "http://localhost:3004/personajes";
  let [data, setData] = useState([]);

  const [updateList, setUpdateList] = useState(false);

  const getData = async () => {
    let request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(URL, request)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [updateList]);

  return (
    <div>
      <Container fluid="md">
        {/* <AnimatePresence> */}
        <h1>Lista de Personajes</h1>
        <br></br>

        <Row>
          {data.map((character) => {
            return (
              <CardCharacter
                key={character.id}
                character={character}
                setUpdateList={setUpdateList}
                updateList={updateList}
              ></CardCharacter>
            );
          })}
        </Row>
        {/* </AnimatePresence> */}
      </Container>
    </div>
  );
};

export default ListCharacter;
