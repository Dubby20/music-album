import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("renders header title", () => {
  render(<Header />);

  const headerElement = screen.getByText(/Aula Music Collection/i);
  expect(headerElement).toBeInTheDocument();
});
