import React, { useState } from "react";
import { Plus } from "react-feather";
import type { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleDone: (id: number) => void;
  onSelectTask: (task: Task) => void;
  selectedTask: Task | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  addTask,
  toggleDone,
  onSelectTask,
  selectedTask,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return alert("Title cannot be empty");
    if (newTitle.length > 120) return alert("Title too long (max 120 chars)");
    if (newDesc.length > 1000)
      return alert("Description too long (max 1000 chars)");
    addTask(newTitle.trim(), newDesc.trim());
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(false);
  };

  return (
    <section className="flex-1  p-6">
      <h1 className="text-3xl font-bold mb-6">Today</h1>
      <ul className="space-y-2">
        <li className="p-3 rounded-md bg-gray-50 border-t border-b border-gray-200">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-black font-medium"
            >
              <Plus size={16} /> Add a new task
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Task title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border rounded-md px-2 py-1"
              />
              <textarea
                placeholder="Task description (optional)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-yellow-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:underline text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </li>

        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm pl-2">No tasks yet.</p>
        )}

        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-3 border-b border-gray-200 rounded-md cursor-pointer transition-colors ${
              selectedTask?.id === task.id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={() => onSelectTask(task)}
          >
            <div className="flex items-center gap-2">
              <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleDone(task.id);
                }}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={task.done ? "line-through text-gray-400" : ""}
              >
                {task.title}
              </label>
            </div>
            <span className="text-gray-400">›</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
