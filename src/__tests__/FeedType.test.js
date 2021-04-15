import { render, screen } from "@testing-library/react";
import FeedType from "../components/FeedType";

describe("FeedType", () => {
  test("renders FeedType component", () => {
    render(<FeedType />);

    expect(screen.getByText(/Show:/)).toBeInTheDocument();
    expect(screen.getByText(/Top Albums/)).toBeInTheDocument();
    expect(screen.getByText(/Top Songs/)).toBeInTheDocument();
  });

  test("renders", () => {
    render(<FeedType />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Top Albums" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Top Songs" })
    ).toBeInTheDocument();
  });
});
