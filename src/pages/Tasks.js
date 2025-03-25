// src/pages/Tasks.js
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { CheckSquare, Plus, X, Home } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todos');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...task, id: t.id } : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  // Filtrar tarefas com base nos dropdowns
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      categoryFilter === 'Todas' || task.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'Todos' || task.status === statusFilter.toLowerCase();
    return matchesCategory && matchesStatus;
  });

  return (
    <div>
      {/* Header de ponta a ponta */}
      <div className="w-full bg-white py-3 px-4 flex justify-between items-center border-b border-gray-200 mb-4">
        <div className="max-w-2xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center text-black">
            <CheckSquare className="mr-2 text-indigo-600" /> Lista de Tarefas
          </h1>
          <button className="text-gray-500 hover:text-gray-700">
            <Home className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Conteúdo centralizado (apenas header e filtros) */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Descrição e botão "Nova Tarefa" */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-black">Minhas Tarefas</h2>
            <p className="text-gray-500">Organize e gerencie suas tarefas</p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="mr-2" /> Nova Tarefa
          </button>
        </div>

        {/* Dropdowns de filtro */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Todas">Todas as categorias</option>
              <option value="Casa">Casa</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Estudos">Estudos</option>
              <option value="Saúde">Saúde</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="flex-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 p-2 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Todos">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de tarefas com largura fluida */}
      <div className="px-4">
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black">
                  {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-black hover:text-gray-700 transition-colors duration-200" />
                </button>
              </div>
              <TaskForm
                addTask={addTask}
                closeModal={() => setIsModalOpen(false)}
                initialTask={editingTask}
              />
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full max-w-3xl mx-auto mb-2"
                      >
                        <TaskCard
                          task={task}
                          index={index}
                          onDelete={deleteTask}
                          onEdit={editTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}