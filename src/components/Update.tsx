import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import qs from 'qs';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const UpdateTask: React.FC = () => {
    let { id } = useParams<{ id: string }>();

    const [task, setTask] = useState<Task | null>(null);
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleGetTask = async (id: number) => {
        try {
            const response = await api.get(`/task/${id}`);
            const fetchedTask: Task = response.data.data.message;
            setTask(fetchedTask);
            setInputs({
                title: fetchedTask.title,
            });
        } catch (error) {
            setAlertMessage('Ocorreu um erro ao buscar a tarefa. Por favor, tente novamente.');
        }
    };

    const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputs.title === "") {
            setAlertMessage("Preencha todos os campos do formulário.");
        } else {
            try {
                await api.put(`/task/${id}`, qs.stringify({
                    'title': inputs.title
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                setAlertMessage("Tarefa atualizada com sucesso");
            } catch (error) {
                setAlertMessage("Ocorreu algum problema, tente novamente!");
            }
        }
    };

    useEffect(() => {
        handleGetTask(Number(id));
    }, [id]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Detalhes da Tarefa</h1>
            <p className="text-muted">ID da tarefa: {id}</p>
            {task ? (
                <form onSubmit={handleUpdateSubmit} className="border p-4 rounded bg-light shadow-sm">
                    {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Título:</label>
                        <input type="text" id="title" name="title" value={inputs.title || ''} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Atualizar</button>
                    </div>
                </form>
            ) : (
                <p>Carregando tarefa...</p>
            )}
            <Link to="/dashboard" className="btn btn-link mt-3">Voltar para o início</Link>
        </div>
    );
};

export default UpdateTask;