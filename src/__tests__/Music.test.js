import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { handlers } from "../testData/handler";
import Music from "../components/Music";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Music componment", () => {
  test("renders components initial state", () => {
    render(<Music />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Search for album")).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "loader" })).toBeInTheDocument();
  });

  test("renders albums with data", async () => {
    render(<Music />);
    await waitFor(() => screen.getByText("iTunes Store: Top Albums"));

    expect(screen.getByText("iTunes Store: Top Albums")).toBeInTheDocument();
    expect(screen.getByText("Obviously")).toBeInTheDocument();
  });

  test("searches albums", async () => {
    render(<Music />);

    await waitFor(() => screen.getByText("iTunes Store: Top Albums"));

    expect(screen.getByText("Obviously")).toBeInTheDocument();
    expect(screen.getByText("Spaceman")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Obviously" },
    });

    expect(screen.queryByText("Spaceman")).not.toBeInTheDocument();
  });

  test("Album is not found", async () => {
    render(<Music />);

    await waitFor(() => screen.getByText("iTunes Store: Top Albums"));

    expect(screen.getByText("Obviously")).toBeInTheDocument();
    expect(screen.getByText("Spaceman")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "faq" },
    });

    expect(screen.getByText("No Album Found")).toBeInTheDocument();
  });

  test("fetches albums or songs from itunes API and fails", async () => {
    server.use(
      rest.get(
        "https://itunes.apple.com/us/rss/topalbums/limit=100/json",
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "Error" }));
        }
      )
    );

    render(<Music />);

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });

  test("dropdown changes album list to songs", async () => {
    render(<Music />);

    await waitFor(() => screen.getByText("iTunes Store: Top Albums"));

    expect(screen.getByText("iTunes Store: Top Albums")).toBeInTheDocument();

    expect(screen.getByText("Obviously")).toBeInTheDocument();
    expect(screen.getByText("Spaceman")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "topsongs" },
    });

    expect(screen.getByRole("img", { name: "loader" })).toBeInTheDocument();

    await waitFor(() => screen.getByText("iTunes Store: Top Songs"));

    expect(
      screen.queryByText("iTunes Store: Top Albums")
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Spaceman")).not.toBeInTheDocument();
    expect(screen.queryByText("Obviously")).not.toBeInTheDocument();

    expect(screen.getByText("Leave The Door Open")).toBeInTheDocument();
    expect(screen.getByText("On The Ground")).toBeInTheDocument();
  });
});
