import * as React from "react";
import { useState, useEffect } from "react";
//Firestore

import {
    Button,
    Form,
    Col,
    Row,
  } from "react-bootstrap";
  
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
    const [name, setName] = useState("Welcome To my Page my friend")
    const [surname, setSurname] = useState("")
    const [message, setMessage] = useState("")

    async function addDB(e){
      e.preventDefault()
      await fetch("http://backend-server:5000/hello", {
        method: "GET"
      }).then((res)=> res.json())
      .then((value) => {
        console.log(`Message from the Flask API ${value["message"]}`)
        setMessage(value['message'])
      })
      console.log("Clicked Submit")
    }

    return (  

        <div style={{
            padding:"30px"
        }}>
            
    <h1 style={{
        display:"flex",
        justifyContent:"center",
        marginBottom:"20px"
    }}>EXAMPLE K8S PROJECT WITH REACT</h1>
    <Form onSubmit={addDB}>
        <Form.Group
          as={Row}
          className="mb-3"
          //controlId="formHorizontalPassword"
          controlId="validationCustom03"
        >
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          //controlId="formHorizontalPassword"
          controlId="validationCustom03"
        >
          <Form.Label column sm={2}>
            Surname
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              required
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => {
                console.log(e.target.value);
                setSurname(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 5, offset: 5 }}>
          <Button variant="primary" type="submit">Add</Button>
          </Col>
        </Form.Group>
    </Form>

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems: "center",
      marginTop:"50px"
    }}>
       <h1>{message}</h1>
    </div>

        </div>
    );
}

export default HomePage;