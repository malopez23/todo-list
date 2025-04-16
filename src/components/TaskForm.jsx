import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ addTask, closeModal, initialTask }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [description, setDescription] = useState(initialTask ? initialTask.description || '' : '');
  const [category, setCategory] = useState(initialTask ? initialTask.category : 'Casa');
  const [priority, setPriority] = useState(initialTask ? initialTask.priority : 'Baixa');
  const [status, setStatus] = useState(initialTask ? initialTask.status : 'pendente');
  const [dueDate, setDueDate] = useState(initialTask ? initialTask.dueDate || null : null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate || null);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Casa');
      setPriority('Baixa');
      setStatus('pendente');
      setDueDate(null);
    }
  }, [initialTask]);

  const handleDateChange = (date) => {
    if (!date) {
      setDueDate(null);
      return;
    }
    // Converter a data pra YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    setDueDate(formattedDate);
  };

  // Função pra criar um objeto Date a partir de uma string YYYY-MM-DD, ajustando pro fuso horário local
  const parseDateLocal = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    // Criar a data como se fosse no fuso horário local (sem ajuste pra UTC)
    return new Date(year, month - 1, day);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: initialTask ? initialTask.id : Date.now(),
      title,
      description,
      category,
      priority,
      status,
      dueDate,
      order: initialTask ? initialTask.order : 0,
    };
    addTask(task);
    setTitle('');
    setDescription('');
    setCategory('Casa');
    setPriority('Baixa');
    setStatus('pendente');
    setDueDate(null);
    closeModal();
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
          <DatePicker
            selected={parseDateLocal(dueDate)}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione a data"
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