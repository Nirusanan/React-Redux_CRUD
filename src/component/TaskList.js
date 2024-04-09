import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TaskModal from './UpdateTask';

export default function TaskList() {
  const [modalShow, setModalShow] = useState(false);

  const updateTask = () => {
    console.log("update task");
    setModalShow(true);
  }
  const deleteTask = () => {

  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Title</th>
            <th>Descriptiopn</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className='text-center'>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button variant="primary" className='mx-3' onClick={() => updateTask()}> <i class="bi bi-pencil-square"></i> </Button>
              <Button variant="primary" onClick={() => deleteTask()}> <i class="bi bi-trash3"></i></Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <TaskModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
