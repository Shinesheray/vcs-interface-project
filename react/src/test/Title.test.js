import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// Returns true if the title has rendered
test("Checks if the title is rendered.", () => {
  render(<App />);
  screen.getAllByText(/Search for a user on any VCS/);
});
