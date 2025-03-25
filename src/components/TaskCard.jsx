export default function TaskCard({ task, index }) {
    return (
      <div className="bg-white p-4 mb-2 rounded shadow border border-indigo-100">
        <h3 className="text-black">{task.title}</h3>
        <p className="text-gray-500S">{task.description || 'Sem descrição'}</p>
      </div>
    );
  }