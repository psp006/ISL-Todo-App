import React, { useState } from "react";
interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
}
const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return alert("Task title cannot be empty!");
    if (title.length > 120) return alert("Max 120 characters for title.");
    if (description.length > 1000)
      return alert("Max 1000 characters for description.");

    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-64"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-80"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTaskForm;