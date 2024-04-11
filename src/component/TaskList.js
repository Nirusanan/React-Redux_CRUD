import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TaskModal from './UpdateTask';
import { useSelector } from 'react-redux';
import { setSelectedTask, removeTaskFromList, getTasksFromServer, deleteTasksFromServer } from '../slices/tasksSlice';
import { useDispatch } from 'react-redux';


export default function TaskList() {
  const { tasksList } = useSelector((state) => state.tasks)
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();


  const updateTask = (task) => {
    console.log("update task");
    setModalShow(true);
    dispatch(setSelectedTask(task))
  };

  useEffect(() =>{
    dispatch(getTasksFromServer())
  }, [dispatch])

  const deleteTask = (task) => {
    dispatch(deleteTasksFromServer(task))
    .unwrap()
    .then(() =>{
      dispatch(removeTaskFromList(task))
    })
    
  };

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
          {
            tasksList && tasksList.map((task, index) => {
              return (
                <tr className='text-center'>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button variant="primary" className='mx-3' onClick={() => updateTask(task)}> <i class="bi bi-pencil-square"></i> </Button>
                    <Button variant="primary" onClick={() => deleteTask(task)}> <i class="bi bi-trash3"></i></Button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </Table>

      <TaskModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
