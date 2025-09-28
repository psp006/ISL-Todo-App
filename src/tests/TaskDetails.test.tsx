import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskDetails from "../components/TaskDetail";
import type { Task } from "../types";

describe("TaskDetails Component", () => {
  const task: Task = {
    id: 1,
    title: "Detail Task",
    description: "Detail Desc",
    done: false,
    createdAt: new Date(),
  };
  const updateTask = vi.fn();
  const deleteTask = vi.fn();

  test("renders task details", () => {
    render(<TaskDetails task={task} updateTask={updateTask} deleteTask={deleteTask} />);
    expect(screen.getByText("Detail Task")).toBeInTheDocument();
    expect(screen.getByText("Detail Desc")).toBeInTheDocument();
  });

  test("delete button works", async () => {
    render(<TaskDetails task={task} updateTask={updateTask} deleteTask={deleteTask} />);
    const deleteBtn = screen.getByText(/Delete/i);
    await userEvent.click(deleteBtn);
    expect(deleteTask).toHaveBeenCalledWith(1);
  });
});
