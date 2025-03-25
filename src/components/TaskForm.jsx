// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';

export default function TaskForm({ addTask, closeModal, initialTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Outros');
  const [priority, setPriority] = useState('Média');
  const [status, setStatus] = useState('Pendente');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category);
      setPriority(initialTask.priority);
      setStatus(initialTask.status.charAt(0).toUpperCase() + initialTask.status.slice(1));
      setDueDate(initialTask.dueDate ? new Date(initialTask.dueDate) : null);
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTask({
        id: initialTask ? initialTask.id : Date.now().toString(),
        title,
        description,
        category,
        priority,
        status: status.toLowerCase(),
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
      });
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite uma descrição para a tarefa"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
          rows="3"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Outros">Outros</option>
            <option value="Casa">Casa</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
            <option value="Saúde">Saúde</option>
            <option value="Pessoal">Pessoal</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Prioridade</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
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
            className="border border-gray-300 p-2 rounded w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-black">Data de Conclusão</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/aaaa"
            className="border border-gray-300 p-2 rounded w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            showPopperArrow={false}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-black border font-semibold border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          {initialTask ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
      </div>
    </form>
  );
}