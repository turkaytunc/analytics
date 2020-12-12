import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders PerfAnalytics link", () => {
  render(<App />);
  const linkElement = screen.getByText(/PerfAnalytics/i);
  expect(linkElement).toBeInTheDocument();
});
