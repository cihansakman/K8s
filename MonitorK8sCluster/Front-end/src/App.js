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

function App() {
    const [message, setMessage] = useState("Welcome To my Page my friend")
    const [userId, setUserId] = useState("")
    const [messages, setMessages] = useState([])
    const [showMessages_, setShowMessages] = useState(false)


    //Assign random id when page mounted
    useEffect(() => {
      setUserId(Math.random().toString(36).substring(7));
    }, []);

    async function showMessages(e){
      e.preventDefault()
      await fetch("http://message-backend:5000", {
        method: "GET"
      }).then((res)=> res.json())
      .then((value) => {
        console.log(`Message from the Flask API ${value["message"]}`)
        setMessages(value['messages'])
      })
      console.log("Clicked Submit")
      console.log("messages", messages)
      setShowMessages(!showMessages_)
    }
    

    async function addMessage(e){
      e.preventDefault()
      const response = await fetch("http://message-backend:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([userId, message])
      });
      setMessage('')
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
    <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          //controlId="formHorizontalPassword"
          controlId="validationCustom03"
        >
          <Form.Label column sm={2}>
            Message
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              required
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => {
                console.log(e.target.value);
                setMessage(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

      <div>
        <Col sm={{ span: 5, offset: 5 }} className="mb-3">
          <Button variant="primary" type="submit" onClick={(e)=>{addMessage(e)}}>Add Message</Button>
        </Col>

          <Col sm={{ span: 5, offset: 5}}>
          <Button variant="warning" type="submit" onClick={(e)=>{showMessages(e)}}>Show Messages</Button>
          </Col>
      </div>
        
    </Form>

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems: "center",
      marginTop:"50px"
    }}>
      <ul>
        {
        showMessages_ ? (  messages.map((message) => (
          <li key={messages.indexOf(message)}>
            <strong>{message[0]}: </strong>
            {message[1]}
          </li>
        ))) : (<></>)
      }
      </ul>
      
    </div>

        </div>
    );
}

export default App;
