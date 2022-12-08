import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function App() {
  /**
    This constant stores the list of files and lines received from the API call
  */
  const [data, setData] = React.useState([])
  /**
    This constant stores the name of a file especified in the text input
  */
  const [name, setName] = React.useState()
  /**
    This constant is set to true each time a change has been detected in order to avoid repeated calls
  */
  const [changed, setChanged] = React.useState(true)

  /**
    This hook is executed each time a change has been detected or when the page has loaded for the first time.
    Will request the information to the API and format it to ease the construction of the table
  */
  useEffect(() => {
    if(changed){
      setChanged(false)
      axios
        .get(`http://localhost:9020/files/data${name ? `?fileName=${name}` : ``}`)
        .then((res) => {
          res = res.data.filter( (item) => item.lines.length > 0)
          const list = []
          for (let i = 0; i < res.length; i++) {
            for(let j = 0; j < res[i].lines.length; j++) {
              list.push({
                file: res[i].file,
                ...res[i].lines[j]
              })            
            }
          }
          setData(list)
        })
    }
  })

  /**
    This constant creates the rows for table each time a request to the API is made
  */
  const tableRows = data.map((info) => {
    return (
      <tr>
        <td>{info.file}</td>
        <td>{info.text}</td>
        <td>{info.number}</td>
        <td>{info.hex}</td>
      </tr>
    );
  });  
  
  /**
    @method validateChanges Called when the text input changes. Sets the new name and changed value
    @param event Object that contains the new input value
  */
  function validateChanges(event) {
    setName(event.target.value)
    setChanged(true)
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Search a file</InputGroup.Text>
          <Form.Control
            placeholder="File name"
            aria-label="File Name"
            aria-describedby="basic-addon1"
            onChange={validateChanges}
          />
        </InputGroup>
      </header>
      <div className="App-body">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>File name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
