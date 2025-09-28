import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/SideBar";

describe("Sidebar", () => {
  test("renders menu items", () => {
    const mockSetSearchTerm = vi.fn(); 
    render(<Sidebar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    expect(screen.getByText(/Upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/Calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/Sticky Wall/i)).toBeInTheDocument();
  });

  test("calls setSearchTerm on input change", () => {
    const mockSetSearchTerm = vi.fn();

    render(<Sidebar searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "Test" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Test");
  });
});

