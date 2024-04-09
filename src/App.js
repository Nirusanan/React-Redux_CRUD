import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import AddTask from './component/AddTask';
import Container from './../node_modules/react-bootstrap/esm/Container';
import {Row, Col} from 'react-bootstrap';
import TaskList from './component/TaskList';

function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TaskList/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
