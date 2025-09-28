import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "../components/TaskList";
import type { Task } from "../types";

describe("TaskList Component", () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Desc 1",
      done: false,
      createdAt: new Date(),
    },
  ];
  const addTask = vi.fn();
  const toggleDone = vi.fn();
  const onSelectTask = vi.fn();

  test("renders task and add button", () => {
    render(
      <TaskList
        tasks={tasks}
        addTask={addTask}
        toggleDone={toggleDone}
        onSelectTask={onSelectTask}
        selectedTask={null}
      />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText(/Add a new task/i)).toBeInTheDocument();
  });

  test("toggle task done calls function", async () => {
    render(
      <TaskList
        tasks={tasks}
        addTask={addTask}
        toggleDone={toggleDone}
        onSelectTask={onSelectTask}
        selectedTask={null}
      />
    );
    const checkbox = screen.getByLabelText("Task 1");
    await userEvent.click(checkbox);
    expect(toggleDone).toHaveBeenCalledWith(1);
  });
});
