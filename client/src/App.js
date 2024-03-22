import { React, useEffect, useState } from 'react';
import { Table, Navbar, Spinner } from 'react-bootstrap';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/files/data').then((res)=>{
      return res.json();
    }).then(table => {
      const rows = [];
      table.forEach((files) => {
        return files.lines.forEach(element => {
          return rows.push({ ...element, fileName: files.file })
        });
      })
      setData(rows);
    })
  }, [setData]);

  return (
    <div>
    <Navbar bg="primary" variant="light">
      <Navbar.Brand className='text'>React Test App</Navbar.Brand>
    </Navbar>
      <div className="container">
        {data ? (
        <Table striped bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.fileName}</td>
                <td>{row.text}</td>
                <td>{row.number}</td>
                <td>{row.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>): (<div className="spinner" ><Spinner animation="border" role="status"/></div>)}
      </div>
    </div>
  );
}

export default App;
