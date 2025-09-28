import React, { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetail";
import type { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved).map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = { id: Date.now(), title, description, done: false, createdAt: new Date() };
    setTasks([newTask, ...tasks]);
    setSelectedTask(newTask);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updatedTask } : t)));

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
    setSelectedTask(null);
  };

  const toggleDone = (id: number) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1 flex">
        <TaskList
          tasks={filteredTasks}
          addTask={addTask}
          toggleDone={toggleDone}
          onSelectTask={setSelectedTask}
          selectedTask={selectedTask}
        />
        <TaskDetails task={selectedTask} updateTask={updateTask} deleteTask={deleteTask} />
      </main>
    </div>
  );
};

export default App;
