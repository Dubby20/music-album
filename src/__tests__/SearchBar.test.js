import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("Search Bar", () => {
  test("renders search bar", () => {
    render(<SearchBar />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
