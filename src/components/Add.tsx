import React, { ChangeEvent, FormEvent, useState } from 'react';
import qs from 'qs';
import api from '../services/api';
import { Link } from 'react-router-dom';

const AddTask: React.FC = () => {
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleAddTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputs.title === "") {
            setAlertMessage("Preencha todos os campos do formulário.");
        } else {
            try {
                await api.post('/task', qs.stringify({
                    'title': inputs.title,
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                setAlertMessage("Tarefa adicionada com sucesso");
                setInputs({});
            } catch (error) {
              console.log(error)
                setAlertMessage("Ocorreu algum problema, tente novamente!");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Adicionar Nova Tarefa</h1>
            <form onSubmit={handleAddTaskSubmit} className="border p-4 rounded bg-light shadow-sm">
                {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" id="title" name="title" value={inputs.title || ''} onChange={handleChange} className="form-control" required />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Criar Tarefa</button>
                </div>
            </form>
            <Link to="/dashboard" className="btn btn-link mt-3">Voltar para o início</Link>
        </div>
    );
};

export default AddTask;