import * as React from "react";
import { useState, useEffect } from "react";
//Firestore
import { db } from "../firebaseConfig";
import { collection,addDoc, getDocs } from "firebase/firestore";

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
    const [database, setDB] = useState([])
    const [matched, setMatched] = useState(true)


    const storeDbRef = collection(db, "k8sExampleDB");

    //Get data from FireStore
    useEffect(() => {
        (async () => {
            
            const data = await getDocs(storeDbRef);
            setDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

          })();
    },[matched])

    async function addDB(e){
        e.preventDefault()
        console.log("name and surname ", name, surname)
        await addDoc(storeDbRef, {
            "name": name,
            "surname": surname
        })
        .then((ref) => {
          console.log("Succesfully did it!");
        })
        .catch((error) => {
          console.log(error);
        });

        setName("")
        setSurname("")
        setMatched(!matched)
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

    <div>
        <ul>
              {
                (
                    database.map((person)=>{
                        return(
                            <li>{person.name}, {person.surname}</li>
                        )
                    })
                ) 
              }
        </ul>
    </div>

        </div>
    );
}

export default HomePage;