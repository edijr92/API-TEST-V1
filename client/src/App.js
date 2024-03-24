import { React, useEffect } from 'react';
import { Table, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { store } from './redux/store'
import { allFiles, fetchGetsFiles, chooseFile, fetchFile } from './redux/slices';
import { Form } from 'react-bootstrap';
import './App.css';

function App() {
  // const dispatch = useDispatch();
  const state = useSelector(allFiles);
  const { data, files, fileSelected } = state;

  const handleOnchange = (event) => {
    event.preventDefault();
    store.dispatch(chooseFile(event.target.value))
    if (event.target.value) {
      store.dispatch(fetchFile(event.target.value))
    }
  };

  useEffect(() => {
    store.dispatch(fetchGetsFiles())
  }, [data, fileSelected]);

  return (
    <div>
    <Navbar bg="primary" variant="light">
      <Navbar.Brand className='text'>React Test App</Navbar.Brand>
    </Navbar>
      <div className="container">
        <div className='select'>
          <Form>
            <Form.Group>
              <Form.Label>Seleccionar archivo</Form.Label>
              <Form.Select onChange={handleOnchange}>
                {files && files.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      {data.length !== 0 ? (
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
        </Table>): (<div className="spinner" ><h2>No hay data disponible...</h2></div>)}
      </div>
    </div>
  );
}

export default App;
