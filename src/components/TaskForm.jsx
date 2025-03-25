// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TaskForm({ addTask, closeModal, initialTask }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [description, setDescription] = useState(initialTask ? initialTask.description || '' : '');
  const [category, setCategory] = useState(initialTask ? initialTask.category : 'Casa');
  const [priority, setPriority] = useState(initialTask ? initialTask.priority : 'Baixa');
  const [status, setStatus] = useState(initialTask ? initialTask.status : 'pendente');
  const [dueDate, setDueDate] = useState(initialTask ? initialTask.dueDate || '' : '');

  // Resetar os campos quando initialTask mudar (ex.: abrir o modal de "Nova Tarefa" depois de editar)
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate || '');
    } else {
      // Resetar os campos quando initialTask é null (modo de criação)
      setTitle('');
      setDescription('');
      setCategory('Casa');
      setPriority('Baixa');
      setStatus('pendente');
      setDueDate('');
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: initialTask ? initialTask.id : uuidv4(),
      title,
      description,
      category,
      priority,
      status,
      dueDate,
      order: initialTask ? initialTask.order : 0,
    };
    addTask(task);
    // Resetar os campos após o envio
    setTitle('');
    setDescription('');
    setCategory('Casa');
    setPriority('Baixa');
    setStatus('pendente');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="3"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="Casa">Casa</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
            <option value="Saúde">Saúde</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Prioridade</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluída">Concluída</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Data de Conclusão</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={closeModal}
          className="border border-gray-200 px-4 py-2 rounded text-black hover:bg-gray-100 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          {initialTask ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
      </div>
    </form>
  );
}