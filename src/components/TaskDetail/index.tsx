import React, { useState, useEffect } from "react";
import type { Task } from "../../types";
import { Edit } from "react-feather";

interface TaskDetailsProps {
  task: Task | null;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  updateTask,
  deleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setIsEditing(false);
    }
  }, [task]);

  if (!task) {
    return (
      <aside className="w-80 bg-gray-100 p-6 rounded-l-2xl flex items-center justify-center text-gray-400 text-sm">
        Select a task to view details
      </aside>
    );
  }

  const handleSave = () => {
    if (!title.trim()) return alert("Title cannot be empty");
    updateTask(task.id, { title, description: desc });
    setIsEditing(false);
  };

  return (
    <aside className="w-80 bg-gray-100 p-6 rounded-l-2xl flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Task</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-black"
            >
              <Edit size={16} />
            </button>
          )}
        </div>

        {!isEditing ? (
          <>
            <p className="font-medium mb-2">{task.title}</p>
            <p className="text-sm text-gray-600">
              {task.description || "No description"}
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-2 py-1 mb-2"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm"
              rows={4}
            />
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-600"
          >
            Save Changes
          </button>
        )}
      </div>
    </aside>
  );
};

export default TaskDetails;
