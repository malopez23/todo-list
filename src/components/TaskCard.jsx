import { Edit, Trash2, Check } from 'lucide-react';

export default function TaskCard({ task, index, onDelete, onEdit }) {
  // Cores para as tags (tons mais suaves, estilo aquarela)
  const priorityColors = {
    Baixa: 'bg-green-50 text-green-600',
    Média: 'bg-yellow-50 text-yellow-600',
    Alta: 'bg-red-50 text-red-600',
  };

  const categoryColors = {
    Casa: 'bg-blue-50 text-blue-600',
    Trabalho: 'bg-blue-50 text-blue-600',
    Estudos: 'bg-blue-50 text-blue-600',
    Saúde: 'bg-blue-50 text-blue-600',
    Pessoal: 'bg-blue-50 text-blue-600',
    Outros: 'bg-blue-50 text-blue-600',
  };

  const statusColors = {
    pendente: 'bg-gray-50 text-gray-600',
    'em andamento': 'bg-gray-50 text-gray-600',
    concluída: 'bg-gray-50 text-gray-600',
  };

  // Função pra formatar a data no formato DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return 'Sem data';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-indigo-50 flex items-center backdrop-blur-sm w-full">
      {/* Título e descrição */}
      <div className="flex-1 min-w-0">
        <h3 className={task.status === 'concluída' ? 'line-through text-gray-400' : 'text-black'}>
          {task.title}
        </h3>
        <p className="text-gray-400 truncate">{task.description || 'Sem descrição'}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${categoryColors[task.category]}`}
          >
            {task.category}
          </span>
          {task.dueDate && (
            <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600">
              {formatDate(task.dueDate)}
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded-full flex items-center ${statusColors[task.status]}`}
          >
            {task.status === 'concluída' ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              task.status
            )}
          </span>
        </div>
      </div>

      {/* Botões de editar e deletar */}
      <div className="flex space-x-2 ml-4">
        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-gray-600">
          <Edit className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-600">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}