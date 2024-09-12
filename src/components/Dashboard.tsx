import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleGetTasks = async () => {
    try {
      const response = await api.get('/task');
      setTasks(response.data.data.message);
      console.log(response.data.data)
    } catch (error) {
      setAlertMessage('Aconteceu algum erro, tente novamente');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await api.delete(`/task/${id}`);
      setAlertMessage(response.data.message);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setAlertMessage('Aconteceu algum erro, tente novamente');
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="shadow p-4 bg-body-tertiary rounded w-100" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="mb-0">Lista de Tarefas</h1>
          <Link to="/add" className="btn btn-success">Adicionar Tarefa</Link>
        </div>
        {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
        <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {tasks.map(task => (
            <div className="card mb-3" key={task.id}>
              <div className="card-body position-relative">
                <h5 className="card-title">{task.title}</h5>
                <div className="d-grid gap-2">
                  <Link to={`/update/${task.id}`} className="btn btn-primary">Atualizar Tarefa</Link>
                </div>
                <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={() => handleDeleteTask(task.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;